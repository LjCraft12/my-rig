const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Messages', messageSchema);