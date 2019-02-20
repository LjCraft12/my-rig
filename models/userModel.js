const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: false
    },
    userPost: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: false
    },
    comments: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        required: false
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