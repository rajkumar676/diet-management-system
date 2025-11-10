// /server/server.js

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

const Message = require('./models/Message'); // Import the Message model

const app = express();
const server = http.createServer(app);

// 🛑 IMPORTANT: Use your actual MongoDB connection string
const DB_URI = 'mongodb://localhost:27017/nutriGuideChatDB'; 
const PORT = 5000; // Server backend port

// Configure CORS to allow communication from your React frontend
app.use(cors({ origin: 'http://localhost:3000' })); // 🛑 Update if your React port is different

// 1. Connect to MongoDB
mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB connected successfully for Chat Service.'))
    .catch(err => console.error('MongoDB connection error:', err));

// 2. Initialize Socket.IO Server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// --- 3. Socket.IO Real-Time Chat Logic ---
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Fetch initial messages when a user joins a thread
    socket.on('fetch_messages', async (threadId) => {
        try {
            const messages = await Message.find({ threadId: threadId }).sort({ timestamp: 1 });
            // Send the history back to the specific client that requested it
            socket.emit('message_history', messages); 
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    });

    // Join a room based on the threadId
    socket.on('join_thread', (threadId) => {
        socket.join(threadId);
    });

    // Handle incoming messages
    socket.on('send_message', async (data) => {
        // data: { threadId: '101', sender: 'User'/'Guide', text: 'message content' }
        try {
            // 🛑 SAVE to MongoDB
            const newMessage = new Message(data);
            await newMessage.save();

            // 🛑 BROADCAST the new message to everyone in the thread (including sender)
            io.to(data.threadId).emit('receive_message', newMessage);

        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
});
// ------------------------------------------

// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Backend chat service running on port ${PORT}`);
});