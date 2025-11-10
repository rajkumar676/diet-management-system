// /server/models/Message.js

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // Stores which conversation this message belongs to
    threadId: {
        type: String, // Use String for simplicity in matching frontend
        required: true,
    },
    // Sender will be 'User' or 'Guide' (based on your current system roles)
    sender: {
        type: String,
        enum: ['User', 'Guide'],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;