const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    toUserId: {
        type: String,
        required: true
    },
    fromUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    messageDescription: {
        type: String,
        required: true
    },
    sent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Messages', messageSchema);