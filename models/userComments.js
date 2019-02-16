const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);