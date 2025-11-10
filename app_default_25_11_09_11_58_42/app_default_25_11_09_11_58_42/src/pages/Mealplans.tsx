// src/pages/MealPlans.tsx
import React from 'react';
import { Container, Typography, Box, Card, Grid, Divider, Button, Chip, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const mockPlans = [
    { id: 1, title: "Weight Loss Kickstart", focus: "Low Carb, High Protein", duration: "4 Weeks", status: "Active", weeklyProgress: 75, guide: "Dr. Smith" },
    { id: 2, title: "Muscle Gain Phase", focus: "High Calorie, Balanced Macros", duration: "8 Weeks", status: "Completed", weeklyProgress: 100, guide: "Coach D." },
    { id: 3, title: "Maintenance & Energy", focus: "Balanced Diet, Fiber Focus", duration: "Ongoing", status: "Pending", weeklyProgress: 0, guide: "Dr. Smith" },
];

const MealPlans: React.FC = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6, p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                🍽️ My Meal Plans
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Review and manage your personalized meal plans assigned by your guide.
            </Typography>

            <Grid container spacing={4}>
                {mockPlans.map((plan) => (
                    <Grid item xs={12} sm={6} lg={4} key={plan.id}>
                        <Card elevation={6} sx={{ p: 3, borderRadius: '16px', height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[10] } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" fontWeight="bold" color="primary.dark">{plan.title}</Typography>
                                <Chip 
                                    label={plan.status} 
                                    color={plan.status === "Active" ? "success" : plan.status === "Completed" ? "info" : "warning"} 
                                    size="small" 
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <FastfoodIcon fontSize="small" sx={{ mr: 1, color: theme.palette.success.main }} />
                                    **Focus:** {plan.focus}
                                </Typography>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: theme.palette.info.main }} />
                                    **Duration:** {plan.duration}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">Progress ({plan.weeklyProgress}%)</Typography>
                                <Box sx={{ height: 10, bgcolor: '#e0f7fa', borderRadius: 5, mt: 0.5 }}>
                                    <Box sx={{ width: `${plan.weeklyProgress}%`, height: '100%', bgcolor: 'success.main', borderRadius: 5 }} />
                                </Box>
                            </Box>

                            <Button 
                                variant={plan.status === "Active" ? "contained" : "outlined"} 
                                fullWidth 
                                sx={{ mt: 1, borderRadius: '10px' }}
                                endIcon={plan.status === "Completed" ? <CheckCircleOutlineIcon /> : null}
                            >
                                {plan.status === "Active" ? "View Today's Meals" : "Review Plan"}
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MealPlans;