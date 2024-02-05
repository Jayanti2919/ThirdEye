const sequelize = require('sequelize');
const RegistrationOTP = require("../models/SQL/registrationotp.model");
const express = require('express');
const router = express.Router();
const crypto = require("crypto");

function generateOTP() {
    const otp = Math.floor(100000 + crypto.randomInt(999999));
    return otp.toString();
}

router.route('/sendOTP').post(async(req, res)=>{
    const body = req.body;
    const otp = generateOTP();
    const user = await RegistrationOTP.findOne({
        where: {
            email: body.email
        }
    });
    if(user) {
        await RegistrationOTP.update({
            otp: otp
        },{
            where: {
                email: body.email
            }
        }).then(()=>{
            res.send("OTP updated successfully");
        }).catch((err)=>{
            console.log(err);
            res.send(err);
        })
    }
    else {
        await RegistrationOTP.create({
            email: body.email,
            otp: otp
        }).then(()=>{
            res.send("OTP created successfully");
        }).catch((err)=>{
            console.log(err);
            res.send(err);})
    }
})

module.exports = router;