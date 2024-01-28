const User = require('../models/SQL/users.model');
const sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

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
    });
})

module.exports = router;