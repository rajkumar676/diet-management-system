// src/pages/Messages.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
    Container, Typography, Box, Grid, Card, Divider, List, ListItem, ListItemText, ListItemAvatar, 
    Avatar, Badge, Button, TextField, InputAdornment, IconButton
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';

// Define the valid user roles and color keys globally
type UserRole = 'User' | 'Guide';
type ColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

// 🛑 CORE MOCKING: CHANGE THIS VALUE FOR TESTING
// To see the User's perspective: MOCK_CURRENT_ROLE = 'User' as UserRole;
// To see the Guide's perspective: MOCK_CURRENT_ROLE = 'Guide' as UserRole;
const MOCK_CURRENT_ROLE = 'User' as UserRole; 

// --- MOCK DATA ---

const MESSAGES_HISTORY = [
    // Messages sent by Guide (Received by User)
    { id: 1, threadId: 101, sender: 'Guide', text: "Hi! Your protein looks spot on.", timestamp: '10:25 AM' },
    // Messages sent by User (Received by Guide)
    { id: 2, threadId: 101, sender: 'User', text: "It's going great! Can I increase my cheat meal calories slightly this weekend?", timestamp: '10:27 AM' },
    { id: 3, threadId: 101, sender: 'Guide', text: "I'd prefer you stick to the plan for another week. Consistency is key right now!", timestamp: '10:30 AM' },
    { id: 4, threadId: 101, sender: 'User', text: "Understood, I'll stick to it. Thanks for the quick response.", timestamp: '10:32 AM' },
    { id: 5, threadId: 101, sender: 'Guide', text: "Perfect. Don't forget to log your dinner by 8 PM!", timestamp: '10:35 AM' },
];

const MOCK_CONVERSATIONS: {
    threadId: number;
    partnerRole: UserRole;
    partnerName: string;
    lastMessage: string;
    unread: number;
    initials: string;
    color: ColorKey;
    current: boolean;
}[] = [
    { threadId: 101, partnerRole: 'Guide', partnerName: 'Dr. Sarah Johnson', lastMessage: "Don't forget to log your dinner!", unread: 0, initials: "DSJ", color: "success", current: true },
    { threadId: 102, partnerRole: 'User', partnerName: 'John Doe', lastMessage: "Thanks for the new plan!", unread: 2, initials: "JD", color: "info", current: false },
    { threadId: 103, partnerRole: 'User', partnerName: 'Mike Wilson', lastMessage: "I have a question about dinner.", unread: 1, initials: "MW", color: "warning", current: false },
];

// --- Main Component ---

const Messages: React.FC = () => {
    const theme = useTheme();
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [activeThreadId, setActiveThreadId] = useState(101);
    const [messages, setMessages] = useState(MESSAGES_HISTORY.filter(m => m.threadId === 101));
    const [input, setInput] = useState('');
    const [chatOpen, setChatOpen] = useState(true); 
    
    const userIsGuide = MOCK_CURRENT_ROLE === 'Guide';
    const activeConvo = MOCK_CONVERSATIONS.find(c => c.threadId === activeThreadId) || MOCK_CONVERSATIONS[0];
    
    // Logic to simulate scrolling to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 🛑 CORE SIMULATION LOGIC: Handles the sending and auto-reply
    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const senderRole = MOCK_CURRENT_ROLE;
        const partnerRole = userIsGuide ? 'User' : 'Guide';

        const newMessage = {
            id: messages.length + 1,
            threadId: activeThreadId,
            sender: senderRole, 
            text: input.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };

        // 1. Add new message to local state
        setMessages((prev) => [...prev, newMessage]);
        const sentText = input.trim();
        setInput('');

        // 2. Trigger auto-reply from the PARTNER's perspective
        simulateAutoReply(sentText, partnerRole);
    };

    const simulateAutoReply = (latestMessage: string, partnerRole: string) => {
        let replyText;
        const lowerMessage = latestMessage.toLowerCase();
        
        if (partnerRole === 'Guide') {
            // Simulated Guide reply to User's message
            if (lowerMessage.includes('macros') || lowerMessage.includes('progress')) {
                replyText = "I see your latest submission. I'll provide feedback on your macros before 5 PM today.";
            } else if (lowerMessage.includes('question')) {
                 replyText = "Please send screenshots of your food log. I can advise better once I see your meal timing.";
            } else {
                replyText = "Thanks for the update. Keep logging, and I'll check in tomorrow!";
            }
        } else { 
            // Simulated User reply to Guide's message
            if (lowerMessage.includes('feedback') || lowerMessage.includes('log')) {
                replyText = "Perfect, thank you! I just finished logging my lunch.";
            } else if (lowerMessage.includes('schedule')) {
                 replyText = "Yes, I need to confirm the new workout schedule.";
            } else {
                replyText = "Understood! I'll get that done.";
            }
        }
        
        setTimeout(() => {
            const replyMessage = {
                id: messages.length + 2,
                threadId: activeThreadId,
                sender: partnerRole as UserRole, // The other party sends the message
                text: replyText,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, replyMessage]);
        }, 1500); // 1.5s delay for realism
    };

    const handleSwitchThread = (threadId: number) => {
        setActiveThreadId(threadId);
        setMessages(MESSAGES_HISTORY.filter(m => m.threadId === threadId));
    };

    const renderMessage = (msg: typeof MESSAGES_HISTORY[0]) => {
        // 🛑 CRITICAL FIX: isSelf determines alignment based on MOCK_CURRENT_ROLE
        const isSelf = msg.sender === MOCK_CURRENT_ROLE;
        
        const senderColor = isSelf ? theme.palette.success.main : theme.palette.grey[200];
        const textColor = isSelf ? 'white' : 'text.primary';

        return (
            <Box 
                key={msg.id}
                sx={{ 
                    display: 'flex', 
                    justifyContent: isSelf ? 'flex-end' : 'flex-start', // Sent messages align right
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        maxWidth: '65%',
                        bgcolor: senderColor,
                        color: textColor,
                        p: 1.5,
                        borderRadius: isSelf 
                            ? '15px 15px 4px 15px' // Sent bubble corners
                            : '15px 15px 15px 4px', // Received bubble corners
                        boxShadow: 1,
                        fontSize: '0.95rem'
                    }}
                >
                    {/* Role header for received messages */}
                    {!isSelf && (
                        <Typography variant="caption" fontWeight="bold" sx={{ opacity: 0.8, color: theme.palette.primary.main, display: 'block', mb: 0.5 }}>
                            {msg.sender === 'Guide' ? 'Dr. Sarah Johnson (Guide)' : 'Client (User)'}
                        </Typography>
                    )}
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem', mt: 0.5, display: 'block', color: isSelf ? 'white' : 'text.secondary' }} align={isSelf ? 'right' : 'left'}>
                        {msg.timestamp}
                    </Typography>
                </Box>
            </Box>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6, p: { xs: 0, md: 4 } }}>
            <Box sx={{ px: { xs: 2, md: 4 }, mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChatBubbleIcon sx={{ mr: 1, fontSize: 'inherit', color: theme.palette.secondary.main }} /> Messaging Panel ({MOCK_CURRENT_ROLE} View)
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Simulated secure communication with your {userIsGuide ? 'clients' : 'Guide'}.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ height: { lg: '80vh' } }}>
                {/* Left Column: Conversation List */}
                <Grid item xs={12} lg={4} sx={{ pr: { lg: 0 } }}>
                    <Card elevation={8} sx={{ p: 0, borderRadius: '16px', height: '100%' }}>
                        <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography variant="h6" fontWeight="bold">Conversations</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Search messages..."
                                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>), sx: { borderRadius: '20px', mt: 1 } }}
                            />
                        </Box>
                        <List disablePadding sx={{ overflowY: 'auto', maxHeight: { lg: 'calc(80vh - 120px)' } }}>
                            {MOCK_CONVERSATIONS.map((convo) => (
                                <ListItem 
                                    key={convo.threadId} 
                                    secondaryAction={convo.unread > 0 ? (
                                        <Badge badgeContent={convo.unread} color="error" overlap="circular" sx={{ mr: 1 }} />
                                    ) : null}
                                    sx={{ 
                                        '&:hover': { bgcolor: theme.palette.grey[50] }, 
                                        cursor: 'pointer', 
                                        bgcolor: convo.threadId === activeThreadId ? theme.palette.primary.light + '15' : 'transparent' 
                                    }}
                                    onClick={() => handleSwitchThread(convo.threadId)} 
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: theme.palette[convo.color].main, fontWeight: 'bold' }}>{convo.initials}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={<Typography fontWeight="bold">{convo.partnerName}</Typography>}
                                        secondary={convo.lastMessage}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Button size="small" variant="outlined" fullWidth sx={{ borderRadius: '10px' }}>View All</Button>
                        </Box>
                    </Card>
                </Grid>

                {/* Right Column: Active Chat Window */}
                <Grid item xs={12} lg={8} sx={{ pl: { lg: 0 } }}>
                    <Card elevation={8} sx={{ p: 0, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        
                        {/* Chat Header */}
                        <Box sx={{ p: 2, bgcolor: theme.palette.primary.light + '10', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: theme.palette[activeConvo.color].main, mr: 1 }}>{activeConvo.initials}</Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">{activeConvo.partnerName}</Typography>
                                    <Typography variant="body2" color="success.main">Online (Simulated)</Typography>
                                </Box>
                            </Box>
                            <IconButton><MoreVertIcon /></IconButton>
                        </Box>
                        <Divider />

                        {/* Chat Body */}
                        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', background: theme.palette.grey[50] }}>
                            {messages.map(renderMessage)}
                            <div ref={chatEndRef} />
                        </Box>

                        <Divider />
                        
                        {/* Input Area */}
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                placeholder={`Type your message to ${activeConvo.partnerName}...`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                                variant="outlined"
                                size="small"
                                sx={{ mr: 1, '& fieldset': { borderRadius: '25px' } }}
                            />
                            <Button 
                                variant="contained" 
                                size="medium" 
                                color="success"
                                sx={{ ml: 1, borderRadius: '25px' }} 
                                endIcon={<SendIcon />}
                                onClick={handleSendMessage}
                                disabled={!input.trim()}
                            >
                                Send
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Messages;