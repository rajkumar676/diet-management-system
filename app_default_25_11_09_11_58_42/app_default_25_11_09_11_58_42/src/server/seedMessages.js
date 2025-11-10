// /server/seedMessages.js
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Adjust path if needed

// 🛑 IMPORTANT: Use your actual MongoDB connection string
const DB_URI = 'mongodb://localhost:27017/nutriGuideChatDB'; 

const MOCK_MESSAGES = [
    // Thread 101: Active Conversation (Guide and User)
    { threadId: '101', sender: 'Guide', text: "Hi! Your protein looks spot on.", timestamp: new Date('2025-11-10T10:25:00Z') },
    { threadId: '101', sender: 'User', text: "It's going great! Can I increase my cheat meal calories slightly this weekend?", timestamp: new Date('2025-11-10T10:27:00Z') },
    { threadId: '101', sender: 'Guide', text: "I'd prefer you stick to the plan for another week.", timestamp: new Date('2025-11-10T10:30:00Z') },
    
    // Thread 102: Secondary Conversation (Unread/Follow-up)
    { threadId: '102', sender: 'User', text: "Thanks for the new plan!", timestamp: new Date('2025-11-09T15:00:00Z') },
    { threadId: '102', sender: 'Guide', text: "Please check the new meal log template.", timestamp: new Date('2025-11-09T16:00:00Z') },
];

async function seedData() {
    try {
        await mongoose.connect(DB_URI);
        console.log('--- MongoDB Connected ---');

        // Clear previous data for a clean test
        await Message.deleteMany({});
        console.log('Existing messages cleared.');

        // Insert the mock data
        await Message.insertMany(MOCK_MESSAGES);
        console.log('MOCK CHAT DATA INSERTED SUCCESSFULLY.');

    } catch (error) {
        console.error('Data seeding failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

seedData();