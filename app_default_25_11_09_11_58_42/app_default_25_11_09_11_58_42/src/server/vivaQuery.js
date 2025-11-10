// /server/vivaQuery.js

const mongoose = require('mongoose');
const Message = require('./models/Message');

const DB_URI = 'mongodb://localhost:27017/nutriGuideChatDB'; 

async function runQuery() {
    try {
        await mongoose.connect(DB_URI);
        console.log('--- Connected to MongoDB ---');

        // 🛑 QUERY 1: PROVE MESSAGES ARE STORED AND FILTERABLE BY SENDER AND THREAD
        console.log('\n--- 1. Query: Messages from Guide (Dr. Sarah Johnson) in Thread 101 ---');
        const guideMessages = await Message.find({ 
            threadId: '101', 
            sender: 'Guide' 
        })
        .select('sender text timestamp')
        .sort({ timestamp: 1 }); // Sorted for chronological order

        console.log(`Found ${guideMessages.length} messages from Guide in thread 101:`);
        console.log(guideMessages);


        // 🛑 QUERY 2: PROVE AGGREGATION/COUNTING BY ROLE
        console.log('\n--- 2. Query: Total Messages Sent by Client (User) Across All Threads ---');
        const userCount = await Message.countDocuments({ sender: 'User' });
        console.log(`Total User Messages Stored: ${userCount}`);


    } catch (error) {
        console.error('Query failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

runQuery();