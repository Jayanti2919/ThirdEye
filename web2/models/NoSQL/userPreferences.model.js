const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    genresWatched: {
        type: [String],
        required: true,
    },
    tagsWatched: {
        type: [String],
        required: true,
    },
    subscribedTo: {
        type: [String],
        required: true,
    },
    likedVideos: {
        type: [String],
        required: true,
    },
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;