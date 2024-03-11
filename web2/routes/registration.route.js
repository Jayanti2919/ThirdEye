const sequelize = require("sequelize");
const RegistrationOTP = require("../models/SQL/registrationotp.model");
const Users = require("../models/SQL/users.model");
const express = require("express");
const router = express.Router();
const { generateOTP, sendEmail } = require("../utils/functions");

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
    if (user.valid === false) {
      res.status(500).json({ message: "User already registered" });
      return;
    } else if (user.createdAt > new Date(Date.now() - 2 * 60000)) {
      res.status(501).json({ message: "Wait for 2 minutes before requesting again" });
      return;
    } else {
      await RegistrationOTP.update(
        {
          otp: otp,
          createdAt: new Date(),
          valid: true,
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
    }
  } else {
    await RegistrationOTP.create({
      email: body.email,
      otp: otp,
      createdAt: new Date(),
      valid: true,
    })
      .then(() => {
        flag = 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (flag === 1) {
    sendEmail(body.email, otp)
      .then((r) => {
        console.log(r);
        res.json({ message: r });
      })
      .catch((error) => {
        console.log(error);
        RegistrationOTP.destroy({
          where: {
            email: body.email,
          },
        })
          .then(() => {
            res.status(502).json({ message: "Error sending email" });
          })
          .catch((err) => {
            console.log(err);
            res.status(503).json({
              message:
                "Error sending email but wait 2 minutes before you try again",
            });
            return;
          });
      });
  } else {
    res.status(504).json({ message: "Error" });
    return;
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
    if(user.valid === false) {
      res.status(503).json({message: "User already registered"});
      return;
    }
    if (user.otp === body.otp) {
      await RegistrationOTP.update(
        {
          valid: false,
        },
        {
          where: {
            email: body.email,
          },
        }
      )
        .then(async () => {
          await Users.create({
            email: body.email,
          })
            .then(() => {
              console.log("User created");
              res.status(200).json({message:"OTP verified and user created successfully"});
            })
            .catch((err) => {
              console.log(err);

              res.status(500).json({message:"OTP verified but error creating user"});
              return;
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(501).json({message:"OTP verified but error updating OTP table"});
          return;
        });
    } else {
      res.status(502).json({message: "Invalid OTP"});
      return;
    }
  } else {
    res.status(504).json({message: "Email not found"});
    return;
  }
});

module.exports = router;
