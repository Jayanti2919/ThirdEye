const sequelize = require("sequelize");
const RegistrationOTP = require("../models/SQL/registrationotp.model");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

function generateOTP() {
  const otp = Math.floor(100000 + crypto.randomInt(999999));
  return otp.toString();
}

router.route("/sendOTP").post(async (req, res) => {
  const body = req.body;
  const otp = generateOTP();
  var flag = 0;
  const user = await RegistrationOTP.findOne({
    where: {
      email: body.email,
    },
  });
  if (user) {
    await RegistrationOTP.update(
      {
        otp: otp,
      },
      {
        where: {
          email: body.email,
        },
      }
    )
      .then(() => {
        flag = 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await RegistrationOTP.create({
      email: body.email,
      otp: otp,
    })
      .then(() => {
        flag = 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (flag === 1) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS | "",
      to: body.email,
      subject: "OTP for login in ThirdEye",
      text: `Your OTP is ${otp}.`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email", err);
        res.status(500).send("Internal server error");
      } else {
        console.log("Email sent:", info.response);
        res.send("OTP sent successfully");
      }
    });
  } else {
    res.json({ message: "Error" });
  }
});

module.exports = router;
