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

module.exports = router;