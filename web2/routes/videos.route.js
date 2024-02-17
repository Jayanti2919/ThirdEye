const sequelize = require('sequelize');
const Video = require('../models/SQL/video.model');
const User = require('../models/SQL/users.model');
const express = require('express');
const router = express.Router();

router.route("/uploadVideo").post(async(req, res) => {
    const body = req.body;
    let user_id = 1;
    const user = await User.findOne({ where: { email: body.email } });
    if (user) {
        user_id = user.userId;
    } else {
        res.status(400).send("User not found");
    }
    Video.create({
        title: body.title,
        description: body.description,
        videoHash: body.videoHash,
        thumbnailHash: body.thumbnailHash,
        userId: user_id,
        genre: body.genre,
        tags: body.tags,
    }).then(() => {
        res.status(200).send("Video uploaded successfully");
    }).catch((err) => {
        res.status(400).send(err);
    });
})

router.route('/getVideoById').get(async(req, res) => {
    const header = req.headers;
    const video = await Video.findOne({ where: { videoId: header.videoId } });
    if (video) {
        res.status(200).send(video);
    } else {
        res.status(400).send("Video not found");
    }
})

router.route('/getVideoByKeywords').get(async(req,res) => {
    const header = req.headers;
    const keyword = header.keyword;

    const videos = await Video.findAll({
        where: {
            [sequelize.or]: [
                {title: {[sequelize.like]: '%'+keyword+'%'}},
                {description: {[sequelize.like]: '%'+keyword+'%'}},
                {tags: {[sequelize.like]: '%'+keyword+'%'}}
            ]
        }
    })
})

router.route('/getVideoByCreator').get(async(req,res) => {
    const header = req.headers;
    const channelName = header.channelName;
    const offset = header.offset;
    const user = await User.findOne({ where: {
        channelName: channelName,
    }}).then(async ()=>{
        const video = await Video.findAll({
            offset: offset,
            limit: 10,
            where: {
                userId: user.userId
            }
        }).then(()=>{
            res.send(video);
        }).catch((error)=>{
            res.send(error);
        })
    }).catch((error)=>{
        res.send(error);
    })
})
/*
    title
    desc
    genre
    creator
    tags
*/


// router.route('/getVideoBySubscription')

module.exports = router;