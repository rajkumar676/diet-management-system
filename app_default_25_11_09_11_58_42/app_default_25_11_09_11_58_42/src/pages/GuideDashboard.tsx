import React from "react";
import {
    Container, Typography, Box, Grid, Card, Divider, Button,
    TextField, InputAdornment, Chip, Avatar, useTheme
} from "@mui/material";
// 🛑 FIX: IMPORT LINK FOR NAVIGATION
import { Link } from "react-router-dom"; 
// Import Chart Components
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';

// Icons
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Register Chart.js components
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend
);

// --- Mock Chart Data ---
const ACTIVE_USER_DATA = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'New Users',
            data: [5, 7, 8, 12, 10, 15, 17],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.3,
        },
    ],
};

const GUIDE_NAV_ITEMS = ['Dashboard', 'Create Plan', 'Messages', 'Analytics', 'Profile']; // Defined for easy navigation mapping

// --- Helper Components (StatCard, AssignedUserRow, TaskItem remain the same) ---

// Top Stat Card (Responsive, Professional Styling)
const StatCard: React.FC<{ title: string; value: string; subtext: string; icon: React.ReactNode; color: string; progress?: string }> = ({ title, value, subtext, icon, color, progress }) => (
    <Card
        elevation={6} 
        sx={{
            height: { xs: 120, md: 140 }, 
            p: 2,
            borderRadius: '16px', 
            borderLeft: `6px solid ${color}`, 
            transition: 'transform 0.3s, box-shadow 0.3s', 
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15)`,
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" fontWeight="bold" color="text.secondary">{title}</Typography>
            <Box sx={{ color: color, fontSize: { xs: 20, md: 28 } }}>{icon}</Box>
        </Box>
        <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>{value}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">{subtext}</Typography>
            {progress && <BarChartIcon fontSize="small" color="success" />}
        </Box>
    </Card>
);

// Assigned User Row (Interactive and detailed)
const AssignedUserRow: React.FC<{ name: string; activity: string; progress: number; initials: string; bgColor: string }> = ({ name, activity, progress, initials, bgColor }) => (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        p: { xs: 1.5, md: 2 },
        borderBottom: '1px solid #f0f0f0',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        '&:last-child': { borderBottom: 'none' },
        '&:hover': { bgcolor: '#f5f5f5' },
    }}>
        <Avatar sx={{ bgcolor: bgColor, width: 44, height: 44, fontSize: '0.9rem', fontWeight: 'bold', mr: 2 }}>{initials}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{name}</Typography>
            <Typography variant="caption" color="text.secondary">Last active: {activity}</Typography>
            <Box sx={{ height: 8, bgcolor: '#e0f7fa', borderRadius: 3, mt: 0.5 }}>
                <Box sx={{
                    width: `${progress}%`,
                    height: '100%',
                    bgcolor: 'success.main',
                    borderRadius: 3,
                    transition: 'width 0.5s',
                }} />
            </Box>
        </Box>
        <Box sx={{ textAlign: 'right', ml: { xs: 1, md: 2 } }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" display={{ xs: 'none', sm: 'block' }}>{progress}%</Typography>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ ml: 1, textTransform: 'none', borderRadius: '20px', mt: { xs: 0.5, md: 0 } }}
                endIcon={<ChevronRightIcon />}
            >
                View
            </Button>
        </Box>
    </Box>
);

// Pending Tasks List Item
const TaskItem: React.FC<{ task: string; meta: string; priority: 'high' | 'medium'; status: 'Complete' | 'Due' }> = ({ task, meta, priority, status }) => {
    const theme = useTheme();
    const priorityColor = priority === 'high' ? theme.palette.error.main : theme.palette.warning.main;
    
    return (
        <Box sx={{
            p: 2,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f9f9f9' }
        }}>
            <Box sx={{ flexGrow: 1, pr: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">{task}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {meta}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Chip
                    label={priority}
                    size="small"
                    sx={{
                        bgcolor: priorityColor,
                        color: '#fff',
                        fontWeight: 'bold',
                        height: 18,
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        mb: 0.5
                    }}
                />
                <Button
                    variant="text"
                    color="success"
                    size="small"
                    startIcon={<CheckCircleIcon fontSize="small" />}
                    sx={{ textTransform: 'none', fontSize: '0.75rem', p: 0 }}
                >
                    {status}
                </Button>
            </Box>
        </Box>
    );
};


// --- Main Component ---
const GuideDashboard: React.FC = () => {
    const theme = useTheme();
    
    // Mock Data
    const assignedUsers = [
        { name: "John Doe", activity: "2 hours ago, 23 days", progress: 85, initials: "JD", bgColor: theme.palette.success.main },
        { name: "Jane Smith", activity: "5 hours ago, 15 days", progress: 72, initials: "JS", bgColor: theme.palette.info.main },
        { name: "Bob Johnson", activity: "Yesterday", progress: 40, initials: "BJ", bgColor: theme.palette.error.main },
        { name: "Alice Green", activity: "Just now", progress: 95, initials: "AG", bgColor: theme.palette.warning.main },
    ];

    const pendingTasks = [
        { task: "Review meal logs for John Doe", meta: "Today", priority: 'high' as const, status: 'Complete' as const },
        { task: "Create meal plan for Jane Smith", meta: "Tomorrow", priority: 'medium' as const, status: 'Complete' as const },
        { task: "Respond to messages (3 unread)", meta: "Today", priority: 'high' as const, status: 'Complete' as const },
        { task: "Prepare Q3 analytics report", meta: "Next Week", priority: 'medium' as const, status: 'Due' as const },
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 0, mb: 6, p: { xs: 1, md: 4 } }}>
            
            {/* 🛑 ACTIVE NAVIGATION HEADER */}
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, px: 3,
                bgcolor: 'background.paper', borderBottom: '1px solid #e0e0e0', mb: 4,
                position: 'sticky', top: 0, zIndex: 100 
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" color="primary.main">NutriGuide</Typography>
                    
                    {/* Responsive Navigation Buttons (Functional Links) */}
                    <Box sx={{ ml: 4, display: { xs: 'none', md: 'flex' } }}>
                        {GUIDE_NAV_ITEMS.map((item) => {
                            // Determine the route path: Dashboard is /guide/dashboard, Messages is /messages, others are kebab-case
                            const path = item === 'Dashboard' ? '/guide/dashboard' : `/${item.toLowerCase().replace(' ', '-')}`;
                            
                            return (
                                <Button 
                                    key={item} 
                                    size="small" 
                                    component={Link} // Use Link component
                                    to={path} // Target Path
                                    color={item === 'Dashboard' ? 'primary' : 'inherit'}
                                    sx={{ 
                                        ml: 2, textTransform: 'none', fontWeight: 'bold', 
                                        '&:hover': { bgcolor: theme.palette.grey[100] } 
                                    }} 
                                    startIcon={item === 'Dashboard' ? <MenuIcon /> : null}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                    </Box>
                </Box>
                {/* User/Notification Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuIcon sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} color="action" />
                    <NotificationsNoneIcon color="action" sx={{ mr: 2 }} />
                    <Chip avatar={<Avatar sx={{ bgcolor: theme.palette.warning.main }}>D</Avatar>} label="demo" sx={{ mr: 1 }} />
                </Box>
            </Box>
            
            <Box sx={{ px: { xs: 1, md: 3 } }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    Guide Dashboard <span style={{ marginLeft: 10 }}>🧑‍⚕️</span>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Manage your assigned users and track their progress.
                </Typography>

                {/* Top Stat Cards Row */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} lg={3}><StatCard title="Total Users" value="5" subtext="2 new this month" icon={<GroupIcon />} color={theme.palette.success.main} /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><StatCard title="Active Users" value="4/5" subtext="80% engagement rate" icon={<GroupIcon />} color={theme.palette.success.main} progress="up" /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><StatCard title="Pending Tasks" value="3" subtext="2 due today" icon={<CalendarTodayIcon />} color={theme.palette.warning.main} /></Grid>
                    <Grid item xs={12} sm={6} lg={3}><StatCard title="Messages" value="3" subtext="Unread messages" icon={<ChatBubbleOutlineIcon />} color={theme.palette.info.main} /></Grid>
                </Grid>

                <Grid container spacing={4}>
                    {/* Left Column: Analytics Chart */}
                    <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 } }}>
                        <Card elevation={8} sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Monthly User Growth (Analytics)</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Tracking active user count over the last 7 months.</Typography>
                            <Box sx={{ height: 350, width: '100%' }}>
                                <Line data={ACTIVE_USER_DATA} options={{ maintainAspectRatio: false }} />
                            </Box>
                        </Card>
                    </Grid>
                    
                    {/* Right Column: Pending Tasks */}
                    <Grid item xs={12} lg={4} sx={{ order: { xs: 1, lg: 2 } }}>
                        <Card elevation={8} sx={{ p: 0, borderRadius: '16px', height: '100%' }}>
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>Pending Tasks</Typography>
                                <Typography variant="body2" color="text.secondary">What needs attention</Typography>
                            </Box>
                            <Divider />
                            <Box>
                                {pendingTasks.map((task, index) => (<TaskItem key={index} {...task} />))}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bottom Row: Assigned Users (Full Width) */}
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Card elevation={8} sx={{ p: 0, borderRadius: '16px' }}>
                            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="h5" fontWeight="bold" sx={{ mb: { xs: 2, md: 0 } }}>Assigned Users List</Typography>
                                <Button variant="contained" color="success" startIcon={<PersonAddIcon />} sx={{ textTransform: 'none', borderRadius: '20px', fontWeight: 'bold' }}>Add User</Button>
                            </Box>
                            <Divider />
                            
                            <Box sx={{ p: 3 }}>
                                <TextField fullWidth variant="outlined" size="small" placeholder="Search users..." InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>), sx: { borderRadius: '12px', mb: 2 } }} />
                                <Box>
                                    {assignedUsers.map((user, index) => (<AssignedUserRow key={index} {...user} />))}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default GuideDashboard;