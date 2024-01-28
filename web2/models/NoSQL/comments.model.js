const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    videoHash: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    replies: {
        type: [
            {
                username: {
                    type: String,
                    required: true,
                },
                profilePic: {
                    type: String,
                },
                commentText: {
                    type: String,
                    required: true,
                },
                likeCount: {
                    type: Number,
                    default: 0,
                },
            }
        ]
    }
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;