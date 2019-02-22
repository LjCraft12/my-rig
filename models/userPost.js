const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userPost = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: false
    },
    posted: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Post', userPost);