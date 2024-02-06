const sequelize = require("sequelize");
const RegistrationOTP = require("../models/SQL/registrationotp.model");
const Users = require("../models/SQL/users.model");
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

router.route("/verifyOTP").post(async (req, res) => {
    const body = req.body;
    const user = await RegistrationOTP.findOne({
        where: {
        email: body.email,
        },
    });
    if (user) {
        if (user.otp === body.otp) {
        await Users.create({
            email: body.email,
        }).then(() => {
            console.log("User created");
            res.send("OTP verified and user created successfully");
        }).catch((err) => {
            console.log(err);
            res.send("OTP verified but error creating user");
        });
        } else {
            res.send("Invalid OTP");
        }
    } else {
        res.send("Email not found");
    }
})

module.exports = router;
