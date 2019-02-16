const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    joined: {
        type: String,
        required: false
    },
    lastLogin: {
        type: String,
        required: false
    },
    userMessages: {
        type: Schema.Types.ObjectId,
        ref: 'Messages',
        required: true
    },
    userPost: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comments: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    skills: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);