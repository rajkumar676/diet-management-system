// src/pages/GuideMessages.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
    Container, Typography, Box, Grid, Card, Divider, List, ListItem, ListItemText, ListItemAvatar, 
    Avatar, Badge, Button, TextField, InputAdornment, IconButton,
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material';
// 🛑 IMPORTANT: Import DB functions for persistence
import { getMessagesByThread, saveNewMessage, MOCK_CONVERSATIONS } from '../services/dbService'; 

// Define the valid user roles and color keys globally
type UserRole = 'User' | 'Guide';
type ColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

// 🛑 CORE MOCKING: This page is locked to the 'Guide' perspective.
const MOCK_CURRENT_ROLE = 'Guide' as UserRole; 

// --- Main Component ---

const GuideMessages: React.FC = () => { // Component start
    const theme = useTheme();
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [activeThreadId, setActiveThreadId] = useState(101);
    const [messages, setMessages] = useState(getMessagesByThread(101)); 
    const [input, setInput] = useState('');
    
    // Derived state/constants
    const userIsGuide = MOCK_CURRENT_ROLE === 'Guide';
    const activeConvo = MOCK_CONVERSATIONS.find(c => c.threadId === activeThreadId) || MOCK_CONVERSATIONS[0];
    
    // Logic to simulate scrolling to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    // 🛑 1. Function to display each message bubble
    const renderMessage = (msg: {id: number, sender: string, text: string, timestamp: string}) => {
        const isSelf = msg.sender === MOCK_CURRENT_ROLE;
        
        const senderColor = isSelf ? theme.palette.success.main : theme.palette.grey[200];
        const textColor = isSelf ? 'white' : 'text.primary';

        return (
            <Box key={msg.id} sx={{ display: 'flex', justifyContent: isSelf ? 'flex-end' : 'flex-start', mb: 2, }}>
                <Box
                    sx={{
                        maxWidth: '65%', bgcolor: senderColor, color: textColor, p: 1.5,
                        borderRadius: isSelf ? '15px 15px 4px 15px' : '15px 15px 15px 4px', boxShadow: 1, fontSize: '0.95rem'
                    }}>
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

    // 2. Function to simulate the auto-reply (User replying to Guide's message)
    const simulateAutoReply = (latestMessage: string, partnerRole: string) => {
        let replyText = ''; // 🛑 FIX: Initialize as empty string
        const lowerMessage = latestMessage.toLowerCase();
        
        // Simulated User reply to Guide's message
        if (partnerRole === 'User') {
            if (lowerMessage.includes('review') || lowerMessage.includes('log')) {
                replyText = "Perfect, thank you! I just finished logging my lunch.";
            } else if (lowerMessage.includes('tomorrow')) {
                 replyText = "Understood, I'll be sure to check in then.";
            } else {
                replyText = "Understood! Thanks for the quick confirmation.";
            }
        }
        
        setTimeout(() => {
            saveNewMessage(activeThreadId, partnerRole, replyText);
            setMessages(getMessagesByThread(activeThreadId));
        }, 1500); 
    };


    // 3. Handler for sending a new message
    const handleSendMessage = () => {
        if (input.trim() === '') return;
        const senderRole = MOCK_CURRENT_ROLE;
        const partnerRole = 'User'; 
        const sentText = input.trim();
        setInput('');

        saveNewMessage(activeThreadId, senderRole, sentText);
        setMessages(getMessagesByThread(activeThreadId));

        simulateAutoReply(sentText, partnerRole);
    };


    // 4. Handler for switching the active conversation
    const handleSwitchThread = (threadId: number) => {
        setActiveThreadId(threadId);
        setMessages(getMessagesByThread(threadId)); 
    };


    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6, p: { xs: 0, md: 4 } }}>
            <Box sx={{ px: { xs: 2, md: 4 }, mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChatBubbleIcon sx={{ mr: 1, fontSize: 'inherit', color: theme.palette.secondary.main }} /> Messaging Panel (Guide View)
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Manage client conversations and send personalized feedback.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ height: { lg: '80vh' } }}>
                {/* Left Column: Client Conversation List */}
                <Grid item xs={12} lg={4} sx={{ pr: { lg: 0 } }}>
                    <Card elevation={8} sx={{ p: 0, borderRadius: '16px', height: '100%' }}>
                        <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
                            <Typography variant="h6" fontWeight="bold">Clients ({MOCK_CONVERSATIONS.length})</Typography>
                            <TextField fullWidth variant="outlined" size="small" placeholder="Search messages..." InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>), sx: { borderRadius: '20px', mt: 1 } }} />
                        </Box>
                        <List disablePadding sx={{ overflowY: 'auto', maxHeight: { lg: 'calc(80vh - 120px)' } }}>
                            {MOCK_CONVERSATIONS.map((convo) => (
                                <ListItem 
                                    key={convo.threadId} 
                                    secondaryAction={convo.unread > 0 ? (<Badge badgeContent={convo.unread} color="error" overlap="circular" sx={{ mr: 1 }} />) : null}
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
                                <Avatar sx={{ bgcolor: activeConvo.color, mr: 1 }}>{activeConvo.initials}</Avatar>
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
                                placeholder={`Send message to ${activeConvo.partnerName}...`}
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

export default GuideMessages;