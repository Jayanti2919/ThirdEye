const sequelize = require('sequelize');
const Video = require('../models/SQL/video.model');
const User = require('../models/SQL/users.model');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Comments = require('../models/NoSQL/comments.model');

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

router.route('/getVideoById').get(async (req, res) => {
    const header = req.headers;
    if (header.videoid === undefined) {
        res.status(400).send("videoId not provided in headers");
        return;
    }

    const video = await Video.findOne({ where: { videoId: header.videoid } });
    
    if (video) {
        res.status(200).send(video);
    } else {
        res.status(400).send("Video not found");
    }
});


router.route('/getVideoByKeywords').get(async(req,res) => {
    const header = req.headers;
    const keyword = header.keyword;

    try{

        const videos = await Video.findAll({
            where: {
                [Op.or]: [
                    {title: {[Op.like]: '%'+keyword+'%'}},
                    {description: {[Op.like]: '%'+keyword+'%'}},
                    {tags: {[Op.like]: '%'+keyword+'%'}}
                ]
            }
        })
        if (videos && videos.length > 0) {
            res.status(200).send(videos);
            return;
        } else {
            res.status(404).send("No results");
            return;
        }
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
        return;
    }
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
            return;
        })
    }).catch((error)=>{
        res.send(error);
        return;
    })
})

router.route('/getVideoBySubscription').get(async(req,res) => {
    // code to get channelName from user subscriptions and find latest videos from those channelNames
})

router.route('/postComment').post(async(req,res) => {
    const body = req.body;
    
    let comment = new Comments ({
        username: body.email,
        profilePic: body.profilePic,
        videoHash: body.videoHash,
        commentText: body.commentText,
    });

    await comment.save().then(()=>{
        console.log(comment);
        res.status(200).json({message: "Comment posted successfully"});
    }).catch((error)=>{
        console.log(error);
        res.status(400).json({message: "An error occured while posting comment"});
    });
});


module.exports = router;