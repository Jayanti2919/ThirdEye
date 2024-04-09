const sequelize = require("sequelize");
const Video = require("../models/SQL/video.model");
const User = require("../models/SQL/users.model");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Comments = require("../models/NoSQL/comments.model");
const UserPreferences = require("../models/NoSQL/userPreferences.model");
const Videos = require("../models/SQL/video.model");

router.route("/uploadVideo").post(async (req, res) => {
  const body = req.body;
  let user_id = 1;
  const user = await User.findOne({ where: { email: body.email } });
  if (user) {
    user_id = user.userId;
  } else {
    res.status(400).json({ message: "User not found" });
    return;
  }
  Video.create({
    title: body.title,
    description: body.description,
    videoHash: body.videoHash,
    thumbnailHash: body.thumbnailHash,
    userId: user_id,
    genre: body.genre,
    tags: body.tags,
  })
    .then(() => {
      res.status(200).json({ message: "Video uploaded successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error uploading video details" });
      return;
    });
});

router.route("/getVideoById").get(async (req, res) => {
  const header = req.headers;
  if (header.videoid === undefined) {
    res.status(400).json({ message: "videoId not provided in headers" });
    return;
  }

  const video = await Video.findOne({ where: { videoId: header.videoid } });

  if (video) {
    res.status(200).json({ message: video });
  } else {
    res.status(400).json({ message: "Video not found" });
  }
});

router.route("/getVideoByKeywords").get(async (req, res) => {
  const header = req.headers;
  const keyword = header.keyword;

  try {
    const videos = await Video.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: "%" + keyword + "%" } },
          { description: { [Op.like]: "%" + keyword + "%" } },
          { tags: { [Op.like]: "%" + keyword + "%" } },
        ],
      },
    });
    if (videos && videos.length > 0) {
      res.status(200).json({ message: videos });
      return;
    } else {
      res.status(404).json({ message: "No results" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching videos" });
    return;
  }
});

router.route("/getVideoByCreator").get(async (req, res) => {
  const header = req.headers;
  const channelName = header.channelName;
  const offset = header.offset;
  const user = await User.findOne({
    where: {
      channelName: channelName,
    },
  })
    .then(async () => {
      const video = await Video.findAll({
        offset: offset,
        limit: 10,
        where: {
          userId: user.userId,
        },
      })
        .then(() => {
          res.status(200).json({ message: video });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ message: "Error while finding videos by creator" });
          return;
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error while finding creator" });
      return;
    });
});
router.route("/getTenVideos").get(async (req, res) => {
  const header = req.headers;
  const offset = header.offset;

  const video = await Video.findAll({
    offset: offset,
    limit: 10,
  })
    .then(() => {
      res.status(200).json({ message: video });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error while finding videos" });
      return;
    });
});

router.route("/getVideoBySubscription").get(async (req, res) => {
  const body = req.body;
  let user = await UserPreferences.findOne({ userId: body.email });
  if (!user) {
    res.status(404).json({ message: "Could not find user" });
    return;
  }
  if (user.subscribedTo.length === 0) {
    res.status(200).json({ message: "No subscriptions" });
    return;
  } else {
    let videos = [];
    user.subscribedTo.forEach(async (element) => {
      await Videos.findOne({
        where: {
          userId: element,
        },
      })
        .then((vid) => {
          if (vid) {
            videos.push(vid);
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json({ message: "Error fetching videos" });
          return;
        });

      res.status(200).json({ message: videos });
      return;
    });
  }
});

router.route("/postComment").post(async (req, res) => {
  const body = req.body;

  let comment = new Comments({
    username: body.email,
    profilePic: body.profilePic,
    videoHash: body.videoHash,
    commentText: body.commentText,
    likeCount: 0,
  });

  await comment
    .save()
    .then(() => {
      console.log(comment);
      res.status(200).json({ message: "Comment posted successfully" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ message: "An error occured while posting comment" });
      return;
    });
});

router.route("/likeComment").put(async (req, res) => {
  let comment = await Comments.findOne({
    where: {
      _id: req.body.id,
    },
  });
  if (!comment) {
    res.status(404).json({ message: "No such comment found" });
    return;
  }
  comment.likeCount += 1;
  await comment
    .save()
    .then(() => {
      res.status(200).json({ message: "Liked successfully" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "Unable to like comment" });
      return;
    });
});

router.route("/unlikeComment").put(async (req, res) => {
  let comment = await Comments.findOne({
    where: {
      _id: req.body.id,
    },
  });
  if (!comment) {
    res.status(404).json({ message: "No such comment found" });
    return;
  }
  comment.likeCount -= 1;
  await comment
    .save()
    .then(() => {
      res.status(200).json({ message: "Unliked successfully" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "Unable to unlike comment" });
      return;
    });
});

router.route("/replyComment").post(async (req, res) => {
  let comment = await Comments.findOne({
    where: {
      _id: req.body.id,
    },
  });
  if (!comment) {
    res.status(404).json({ message: "No such comment found" });
    return;
  }
  comment.replies.push({
    username: req.body.username,
    profilePic: req.body.profilePic,
    commentText: req.body.commentText,
    likeCount: 0,
  });
  await comment
    .save()
    .then(() => {
      res.status(200).json({ message: "Replied successfully" });
      return;
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "Unable to reply" });
    });
});

module.exports = router;
