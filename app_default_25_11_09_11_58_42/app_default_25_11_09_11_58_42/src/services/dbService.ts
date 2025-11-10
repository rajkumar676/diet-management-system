// src/services/dbService.ts

const DB_KEY = 'nutriguide_chat_history';

// Initial data structure to be stored once in localStorage
const INITIAL_DB_STATE = {
    101: {
        messages: [
            { id: 1, sender: 'Guide', text: "Hi! How's your meal plan going?", timestamp: '10:25 AM' },
            { id: 2, sender: 'User', text: "It's going great! Can I increase my cheat meal calories slightly this weekend?", timestamp: '10:27 AM' },
            { id: 3, sender: 'Guide', text: "I'd prefer you stick to the plan for another week. Consistency is key right now!", timestamp: '10:30 AM' },
        ],
    },
    102: { messages: [{ id: 1, sender: 'User', text: "Thanks for the new plan!", timestamp: 'Yesterday' }], },
    103: { messages: [{ id: 1, sender: 'User', text: "I have a question about dinner.", timestamp: '2 days ago' }], },
};

// Functions to initialize, retrieve, and update the database state
const getDbState = () => {
    const data = localStorage.getItem(DB_KEY);
    if (data) {
        return JSON.parse(data);
    }
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DB_STATE));
    return INITIAL_DB_STATE;
};

const saveDbState = (state: any) => {
    localStorage.setItem(DB_KEY, JSON.stringify(state));
};

// --- MOCK DB INTERACTIONS ---

export const getMessagesByThread = (threadId: number) => {
    const state = getDbState();
    return state[threadId] ? state[threadId].messages : [];
};

export const saveNewMessage = (threadId: number, sender: string, text: string) => {
    const state = getDbState();
    if (!state[threadId]) { state[threadId] = { messages: [] }; }
    const thread = state[threadId];
    
    const newMessage = {
        id: thread.messages.length + 1,
        sender: sender,
        text: text,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    thread.messages.push(newMessage);
    saveDbState(state);
    return newMessage;
};

export const MOCK_CONVERSATIONS = [
    { threadId: 101, partnerRole: 'Guide' as const, partnerName: 'Dr. Sarah Johnson', lastMessage: "Consistency is key right now!", unread: 0, initials: "DSJ", color: "success" as const, current: true },
    { threadId: 102, partnerRole: 'User' as const, partnerName: 'John Doe', lastMessage: "Thanks for the new plan!", unread: 2, initials: "JD", color: "info" as const, current: false },
    { threadId: 103, partnerRole: 'User' as const, partnerName: 'Mike Wilson', lastMessage: "I have a question about dinner.", unread: 1, initials: "MW", color: "warning" as const, current: false },
];