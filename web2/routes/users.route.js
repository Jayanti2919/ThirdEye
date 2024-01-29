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

module.exports = router;