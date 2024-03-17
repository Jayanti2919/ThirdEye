const sequelize = require("sequelize");
const RegistrationOTP = require("../models/SQL/registrationotp.model");
const Users = require("../models/SQL/users.model");
const express = require("express");
const router = express.Router();
const { generateOTP, sendEmail } = require("../utils/functions");
const {hashPassword, comparePasswords} =require('../utils/hashPassword');
const axios = require("axios");

router.route("/sendOTP").post(async (req, res) => {
  console.log("Send OTP route called")
  const body = req.body;
  const otp = generateOTP();
  const hashedOTP=await hashPassword(otp)

  var flag = 0;
  const user = await RegistrationOTP.findOne({
    where: {
      email: body.email,
    },
  });
  if (user) {
    if (user.valid === false) {
      res.status(409).json({ message: "User already registered" });
      return;
    } else if (user.createdAt > new Date(Date.now() - 2 * 60000)) {
      res.status(429).json({ message: "Wait for 2 minutes before requesting again" });
      return;
    } else {
      await RegistrationOTP.update(
        {
          otp: hashedOTP,
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
      otp: hashedOTP,
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
        res.status(200).json({ message: r });
      })
      .catch((error) => {
        console.log(error);
        RegistrationOTP.destroy({
          where: {
            email: body.email,
          },
        })
          .then(() => {
            res.status(500).json({ message: "Error sending email" });
          })
          .catch((err) => {
            console.log(err);
            res.status(429).json({
              message:
                "Error sending email but wait 2 minutes before you try again",
            });
            return;
          });
      });
    res.status(200)
  } else {
    res.status(500).json({ message: "Error sending OTP" });
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
      res.status(409).json({message: "User already registered"});
      return;
    }
    if (await comparePasswords(body.otp,user.otp)) {
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
              axios.post('http://localhost:8000/user/createNewUser', {
                email: body.email,
              }).then((r)=>{
                res.status(200).json({message: r.data});
              }).catch(async (err)=>{
                console.log(err);
                await RegistrationOTP.destroy({where:{email:body.email}}).then (async ()=> {
                  await Users.destroy({where:{email:body.email}}).then (()=> {
                    res.status(500).json({message: "Error creating wallet"});
                    return;
                  }).catch((err) => {
                    console.log(err);
                    res.status(501).json({message: "Error creating wallet and error deleting user"});
                    return;
                  })
                }).catch((err) => {
                  console.log(err);
                  res.status(502).json({message: "Error creating wallet and error deleting user and error deleting OTP"});
                });
              });
            })
            .catch((err) => {
              console.log(err);
              RegistrationOTP.destroy({where:{email:body.email}}).then (()=> {
                res.status(500).json({message:"OTP verified but error creating user"});
              }).catch((err) => {
                console.log(err);
                res.status(501).json({message:"OTP verified but error creating user and error deleting OTP"});
                return;
              });
              return;
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(501).json({message:"OTP verified but error updating OTP table"});
          return;
        });
    } else {
      res.status(400).json({message: "Invalid OTP"});
      return;
    }
  } else {
    res.status(404).json({message: "Email not found"});
    return;
  }
});

module.exports = router;
