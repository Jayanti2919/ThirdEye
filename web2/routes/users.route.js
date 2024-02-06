const User = require('../models/SQL/users.model');
const sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const { generateOTP, sendEmail } = require('../utils/functions');
const { route } = require('./registration.route');

router.route('/createUser').post(async(req, res)=>{
    const body = req.body;
    User.create({
        email: body.email,
        channelName: body.channelName,
        channelDesc: body.channelDesc,
        subscriberCount: 0,
        profilePic: body.profilePic,
    }).then(()=>{
        res.send("User created successfully");
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

router.route('/getUser').get(async(req, res)=>{
    const headers = req.headers;
    await User.findOne({
        where: {
            email: headers.email
        }
    }).then((user)=>{
        res.send(user);
    }).catch((err)=>{
        console.lof(err);
        res.send(err);
    })
})

router.route('/updateUser').put(async(req, res)=>{
    const body = req.body;
    await User.update({
        channelName: body.channelName,
        channelDesc: body.channelDesc,
        profilePic: body.profilePic,
    },{
        where: {
            email: body.email
        }
    }).then((user)=>{
        res.send("Updated successfully");
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

router.route('/updateSubCount').put(async(req, res)=>{
    const body = req.body;
    sign = '+';
    if (body.mode === "decrement") {
        sign = '-';
    }
    const command = "subscriberCount " + sign + " 1"; 
    await User.update({ 
        subscriberCount: sequelize.literal(command)
    },{
        where: {
            email: body.email
        }
    }).then((user)=>{
        res.send("Updated successfully");
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

router.route('/loginOTP').post(async(req, res)=>{
    const body = req.body;
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
        res.json({ message: "User not found" });
    }
    const otp = generateOTP();
    await User.update(
        {
            otp: otp,
        },
        {
            where: {
                email: body.email,
            },
        }
    ).then(async() => {
        console.log("OTP updated successfully");
        const response = await sendEmail(body.email, otp);
        res.json({ message: response });
    }).catch((err) => {
        console.log(err);
        res.json({ message: "Error updating OTP" });
    });
})

router.route('/verifyloginOTP').post(async(req, res)=>{
    const body = req.body;
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
        res.json({ message: "User not found" });
    }
    if (user.otp === body.otp) {
        res.json({ message: "OTP verified successfully" });
    } else {
        res.json({ message: "Invalid OTP" });
    }
})

module.exports = router;