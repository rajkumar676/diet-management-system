import React, { useRef } from "react";
import { 
    Container, Typography, Box, Grid, Card, useTheme, LinearProgress, Button,
    Chip, Avatar, Divider,
} from "@mui/material";
// 🛑 FIX: IMPORT LINK FOR NAVIGATION
import { Link } from "react-router-dom"; 
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuIcon from '@mui/icons-material/Menu'; // Added for responsiveness

ChartJS.register(ArcElement, ChartTooltip, Legend);

// --- Static Data ---
const USER_STATS = {
    dailyGoal: 2000,
    dailyConsumed: 1450,
    streak: 23,
    mealsCompleted: 2,
    mealsTotal: 4,
    weeklyProgress: 85,
    longestStreak: 45
};

const MACRO_DATA = { Protein: 35, Carbs: 45, Fat: 20 };

const MEAL_PLAN = [
    { name: "Breakfast", time: "08:00 AM", calories: 450, completed: true },
    { name: "Lunch", time: "12:30 PM", calories: 600, completed: true },
    { name: "Snack", time: "03:00 PM", calories: 150, completed: false },
    { name: "Dinner", time: "07:00 PM", calories: 700, completed: false },
];

const NAV_ITEMS = ['Dashboard', 'Meal Plans', 'Food Log', 'Messages', 'Progress', 'Profile'];

// --- Helper Components ---

// Dashboard Stat Card
const UserStatCard: React.FC<{ title: string; value: React.ReactNode; subtext: string; icon: React.ReactNode; color: string }> = ({ title, value, subtext, icon, color }) => (
    <Card
        elevation={6}
        sx={{
            p: 3,
            borderRadius: '16px',
            height: 140,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: `4px solid ${color}`,
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body2" fontWeight="bold" color="text.secondary">{title}</Typography>
            <Box sx={{ color: color, fontSize: 24 }}>{icon}</Box>
        </Box>
        <Typography variant="h5" fontWeight="900" sx={{ color: 'text.primary' }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary">{subtext}</Typography>
    </Card>
);

// Individual Meal Row Component
const MealRow: React.FC<typeof MEAL_PLAN[0]> = ({ name, time, calories, completed }) => {
    const theme = useTheme();
    const actionColor = completed ? theme.palette.success.main : theme.palette.primary.main;

    return (
        <Box sx={{
            p: 2,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f9f9f9' }
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: actionColor, mr: 2, mt: -0.5 }}>
                    {completed ? <CheckCircleOutlineIcon /> : <CheckBoxOutlineBlankIcon />}
                </Box>
                <Box>
                    <Typography fontWeight="bold">{name}</Typography>
                    <Typography variant="caption" color="text.secondary">{time}</Typography>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}>
                <Chip
                    label={`${calories} cal`}
                    size="small"
                    sx={{
                        bgcolor: actionColor,
                        color: '#fff',
                        fontWeight: 'bold',
                        mr: 1
                    }}
                />
                {!completed && (
                    <Button variant="contained" size="small" sx={{ textTransform: 'none', borderRadius: '10px' }}>
                        Log Meal
                    </Button>
                )}
            </Box>
        </Box>
    );
}


// --- Main Component ---
const UserDashboard: React.FC = () => {
    const theme = useTheme();
    const dashboardRef = useRef<HTMLDivElement>(null);
    const remaining = USER_STATS.dailyGoal - USER_STATS.dailyConsumed;
    const progressPercent = (USER_STATS.dailyConsumed / USER_STATS.dailyGoal) * 100;

    const macroChartData = {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [{
            data: [MACRO_DATA.Protein, MACRO_DATA.Carbs, MACRO_DATA.Fat],
            backgroundColor: [
                theme.palette.success.main,
                theme.palette.error.main,
                theme.palette.warning.main,
            ],
            hoverBackgroundColor: [
                theme.palette.success.dark,
                theme.palette.error.dark,
                theme.palette.warning.dark,
            ],
            borderWidth: 0,
        }],
    };

    // --- PDF Export Handler ---
    const handleExportPDF = () => {
        const input = dashboardRef.current;
        if (!input) return;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save('NutriGuide_Health_Report.pdf');
        });
    };
    
    // Determine the current path for the Dashboard Link logic
    const navItems = ['Dashboard', 'Meal Plans', 'Food Log', 'Messages', 'Progress', 'Profile'];


    return (
        <Container maxWidth="xl" sx={{ mt: 0, mb: 6, p: { xs: 0, md: 4 } }}>
            
            {/* 🛑 ACTIVE NAVIGATION HEADER */}
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, px: { xs: 2, md: 3 },
                bgcolor: 'background.paper', borderBottom: '1px solid #e0e0e0', mb: 4,
                position: 'sticky', top: 0, zIndex: 100 
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" color="primary.main">NutriGuide</Typography>
                    
                    {/* Navigation Buttons (Functional Links) */}
                    <Box sx={{ ml: 4, display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((item) => {
                            // Determine the route path (Dashboard is special, others are kebab-case)
                            const path = item === 'Dashboard' ? '/user/dashboard' : `/${item.toLowerCase().replace(' ', '-')}`;
                            
                            return (
                                <Button 
                                    key={item} 
                                    size="small" 
                                    component={Link} // Use Link component
                                    to={path} // Target Path
                                    color={item === 'Dashboard' ? 'primary' : 'inherit'}
                                    sx={{ 
                                        ml: 2, 
                                        textTransform: 'none', 
                                        fontWeight: 'bold',
                                        '&:hover': { bgcolor: theme.palette.grey[100] }
                                    }}>
                                    {item}
                                </Button>
                            )
                        })}
                    </Box>
                </Box>
                {/* User/Notification Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuIcon sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} color="action" />
                    <NotificationsNoneIcon color="action" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }} />
                    <Chip avatar={<Avatar sx={{ bgcolor: theme.palette.error.main }}>R</Avatar>} label="rajumarkz9528" sx={{ mr: 1 }} />
                </Box>
            </Box>

            {/* Main Dashboard Content - Targeted by PDF Ref */}
            <Box sx={{ px: { xs: 2, md: 3 } }} ref={dashboardRef}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                        Welcome back, User! ✌️
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleExportPDF}
                        startIcon={<FileDownloadIcon />}
                        sx={{ textTransform: 'none', borderRadius: '10px', mt: { xs: 1, md: 0 } }}
                    >
                        Export PDF Report
                    </Button>
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Here's your health summary for today
                </Typography>

                {/* --- STAT CARDS --- */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Card elevation={6} sx={{ p: 3, borderRadius: '16px', height: 160, borderTop: `4px solid ${theme.palette.success.main}` }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="body2" fontWeight="bold" color="text.secondary">Daily Calories</Typography>
                                <LocalFireDepartmentIcon sx={{ color: theme.palette.warning.main, fontSize: 24 }} />
                            </Box>
                            <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', mt: 1 }}>
                                **{USER_STATS.dailyConsumed}** / {USER_STATS.dailyGoal}
                            </Typography>
                            <LinearProgress variant="determinate" value={progressPercent > 100 ? 100 : progressPercent} sx={{ height: 10, borderRadius: 5, bgcolor: theme.palette.grey[300], my: 1 }} color={progressPercent > 90 ? 'error' : 'success'}/>
                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                {remaining > 0 ? `${remaining} calories remaining` : 'Goal reached!'}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <UserStatCard title="Streak" value={<Box sx={{ display: 'flex', alignItems: 'center' }}><Typography variant="h3" fontWeight="900" color="warning.main" mr={1}>{USER_STATS.streak} Days</Typography></Box>} subtext={`Your longest: ${USER_STATS.longestStreak} days`} icon={<MilitaryTechIcon />} color={theme.palette.warning.main} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <UserStatCard title="Meals Today" value={<Typography variant="h3" fontWeight="900">{USER_STATS.mealsCompleted} / {USER_STATS.mealsTotal}</Typography>} subtext={`${USER_STATS.mealsTotal - USER_STATS.mealsCompleted} meals pending`} icon={<RestaurantIcon />} color={theme.palette.info.main} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <UserStatCard title="Weekly Progress" value={<Typography variant="h3" fontWeight="900" color="success.main">{USER_STATS.weeklyProgress}%</Typography>} subtext="Great improvement!" icon={<TrendingUpIcon />} color={theme.palette.success.main} />
                    </Grid>
                </Grid>

                {/* Detailed Data & Charts */}
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={8}>
                        <Card elevation={8} sx={{ p: 0, borderRadius: '16px', height: '100%' }}>
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                    Today's Meal Plan 📋
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Track your meals for the day
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                {MEAL_PLAN.map((meal, index) => (<MealRow key={index} {...meal} />))}
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Card elevation={8} sx={{ p: 3, borderRadius: '16px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>Today's Macros 📊</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Nutritional breakdown</Typography>
                            </Box>
                            <Box sx={{ height: 250, width: '100%', mb: 2 }}>
                                <Doughnut data={macroChartData} options={{ maintainAspectRatio: false }} />
                            </Box>
                            <Button variant="outlined" color="secondary" startIcon={<ChatBubbleOutlineIcon />} sx={{ borderRadius: '20px' }}>Contact Your Guide</Button>
                        </Card>
                    </Grid>
                </Grid>
                
                {/* Placeholder content for other tabs */}
                <Card elevation={8} sx={{ mt: 4, p: 4, borderRadius: '16px' }}>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                        Explore Other Sections
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click on **Meal Plans, Food Log, Messages, or Progress** in the navigation bar to simulate navigation.
                    </Typography>
                </Card>

            </Box>
        </Container>
    );
};

export default UserDashboard;