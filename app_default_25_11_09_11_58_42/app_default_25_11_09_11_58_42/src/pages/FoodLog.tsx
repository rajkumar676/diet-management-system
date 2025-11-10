// src/pages/FoodLog.tsx
import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    Grid, 
    // 🛑 FIX: ADDED MISSING IMPORTS
    Divider, 
    Chip, 
    useTheme, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const mockLogs = [
    { date: "Monday, Nov 10", totalCalories: 1980, protein: 120, carbs: 250, fat: 55, score: 'Excellent' },
    { date: "Sunday, Nov 9", totalCalories: 2150, protein: 135, carbs: 270, fat: 60, score: 'Good' },
    { date: "Saturday, Nov 8", totalCalories: 1700, protein: 110, carbs: 180, fat: 45, score: 'Fair' },
    { date: "Friday, Nov 7", totalCalories: 2050, protein: 140, carbs: 260, fat: 50, score: 'Excellent' },
];

const FoodLog: React.FC = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6, p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                🍔 Daily Food Log
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                A detailed history of your recorded food and nutrition intake.
            </Typography>

            <Grid container spacing={4}>
                {/* Responsive Table for Log History */}
                <Grid item xs={12}>
                    <Card elevation={8} sx={{ borderRadius: '16px', overflowX: 'auto' }}>
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                            <BarChartIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                            <Typography variant="h6" fontWeight="bold">Recent Log History</Typography>
                        </Box>
                        <Divider />
                        <Table component={Paper} sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: theme.palette.grey[50] }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Calories</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Protein (g)</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Carbs (g)</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Fat (g)</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockLogs.map((log) => (
                                    <TableRow key={log.date} sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s', '&:hover': { bgcolor: theme.palette.primary.light + '10' } }}>
                                        <TableCell component="th" scope="row">{log.date}</TableCell>
                                        <TableCell align="right">{log.totalCalories}</TableCell>
                                        <TableCell align="right">{log.protein}</TableCell>
                                        <TableCell align="right">{log.carbs}</TableCell>
                                        <TableCell align="right">{log.fat}</TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={log.score} 
                                                size="small"
                                                color={log.score === 'Excellent' ? 'success' : log.score === 'Good' ? 'info' : 'warning'}
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FoodLog;