import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useTheme,
  Avatar,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
// Import necessary icons
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LoopIcon from '@mui/icons-material/Loop';


// List of the 9 key features pulled directly from your SRS
const srsFeatures = [
  { name: "Dual Role Connectivity", icon: PersonPinCircleIcon, description: "Pair users with experts (Doctor, Trainer, Parent) for continuous guided support and accountability." },
  { name: "Personalized Dashboard", icon: BarChartIcon, description: "Instant view of crucial metrics: calories, macros, streaks, and custom nutritional summaries." },
  { name: "OTP & Secure Login", icon: LockIcon, description: "Secure, two-factor authentication (OTP) and token-based sessions to protect sensitive health data." },
  { name: "Meal Plan Assignment", icon: CalendarMonthIcon, description: "Guides create and assign structured, nutrient-detailed diet plans with macro breakdowns." },
  { name: "Real-time Food Logging", icon: CheckCircleOutlineIcon, description: "Easily log meals, snacks, and notes with automatic calculation of macros and calorie totals." },
  { name: "Progress & Streak Tracking", icon: TrendingUpIcon, description: "Visual charts show consistency (30-day streak) and performance trends over time." },
  { name: "Secure Messaging Panel", icon: ChatBubbleOutlineIcon, description: "Two-way, encrypted chat system for real-time advice, feedback, and motivational support." },
  { name: "Notifications & Reminders", icon: NotificationsActiveIcon, description: "Automated alerts for meal timings, hydration, task updates, and messages from your guide." },
  { name: "Health Report Generation", icon: BarChartIcon, description: "Exportable weekly/monthly PDF reports showing performance trends, BMI, and nutrient ratios." },
];

// FIX: Define image paths using ABSOLUTE strings (assuming files are now in /public)
const dmsImage1 = '/dms1.png'; // Image 1 (Report)
const dmsImage2 = '/dms3.png'; // Image 2 (Report)
const dmsImage3 = '/dms2.png'; // Image 3 (Report/Interface)


// --- Define type for DMSDescriptionProps ---
interface DMSDescriptionProps {
    title: string;
    body: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    color: string;
}
// -------------------------------------------------------------------------


const AboutUs: React.FC = () => {
  const theme = useTheme();
  
  // Custom Card style for full-width content blocks
  const contentCardStyle = {
    transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
    borderRadius: '16px', 
    padding: theme.spacing(4),
    boxShadow: theme.shadows[15], // Deep shadow for professional look
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'left' 
  };

  // Custom Card style for the 9 feature grid items (with hover effect)
  const featureCardStyle = {
    p: 3, 
    borderRadius: '12px', 
    border: `1px solid ${theme.palette.divider}`,
    height: '100%',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    background: `linear-gradient(145deg, ${theme.palette.common.white} 0%, ${theme.palette.grey[50]} 100%)`,
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)', // Professional scale/lift effect
      boxShadow: theme.shadows[20], // Deep shadow on hover
      background: `linear-gradient(145deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      '& .MuiTypography-root, & svg': { // Change text and icon color on hover
        color: theme.palette.common.white + ' !important',
      }
    }
  };

  const ImageStyle = { 
      // FIX: Increased height for better clarity
      height: 280, 
      width: '100%', 
      display: 'block',
      borderRadius: '8px',
      // FIX: Use 'contain' to ensure the ENTIRE image fits without cropping text/data
      objectFit: 'contain', 
      boxShadow: theme.shadows[5],
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.05)', // Image hover effect
        boxShadow: theme.shadows[15],
      }
  };


  // FIX: Apply the DMSDescriptionProps interface here
  const DMSDescription: React.FC<DMSDescriptionProps> = ({ title, body, icon: Icon, color }) => (
    <Box sx={{ mb: 6, p: { xs: 0, md: 3 }, borderLeft: `5px solid ${color}`, borderRadius: '4px', textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: color, mr: 2 }}>
                <Icon />
            </Avatar>
            <Typography variant="h5" component="h3" fontWeight={700} color={color}>
                {title}
            </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {body}
        </Typography>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 8, mb: 10 }}>
      
      {/* GLOBAL HEADING */}
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight={800} color="primary" sx={{ mb: 6 }}>
        About NutriGuide: Structured Wellness
      </Typography>

      {/* ---------------- SECTION 1: THE PROBLEM (Full Width with Visual Proof) ---------------- */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12}>
          <Card sx={contentCardStyle}>
            <CardContent>
              <HealthAndSafetyIcon color="error" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={700} color="error.main">
                The Health Gap: Why Self-Dieting Fails
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: 1000, mx: 'auto' }}>
                Unstructured dieting and lack of continuous accountability are **global issues** leading to poor, unsustainable health outcomes. Without expert, structured, and personalized advice, individuals struggle to maintain consistency, often resulting in diet failure and frustration. This systemic problem requires a specialized, role-based solution.
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              {/* --- VISUAL EVIDENCE: THREE REPORTS SIDE-BY-SIDE (Full Width) --- */}
              <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
                Visual Evidence: Global Health Inconsistency Reports
              </Typography>
              <Grid container spacing={3}>
                {/* Image 1 */}
                <Grid item xs={12} sm={4}>
                   <Box component="img" src={dmsImage1} alt="Health Report 1" sx={ImageStyle} />
                </Grid>
                {/* Image 2 */}
                <Grid item xs={12} sm={4}>
                   <Box component="img" src={dmsImage2} alt="Health Report 2" sx={ImageStyle} />
                </Grid>
                {/* Image 3 */}
                <Grid item xs={12} sm={4}>
                   <Box component="img" src={dmsImage3} alt="Health Report 3" sx={ImageStyle} />
                </Grid>
              </Grid>
              <Typography variant="caption" color="text.disabled" display="block" align="center" sx={{ mt: 2 }}>
                  These reports illustrate the widespread challenge faced by those attempting diet management without expert oversight.
              </Typography>
              {/* --- END VISUAL EVIDENCE --- */}

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* ---------------- SECTION 2: THE SOLUTION (Full Width Detailed Explanation) ---------------- */}
      <Grid container spacing={4} sx={{ mb: 10 }}>
        <Grid item xs={12}>
          <Card sx={{ ...contentCardStyle, borderLeft: `8px solid ${theme.palette.primary.main}` }}>
            <CardContent>
              <TrendingUpIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
                The DMS Solution: A Quoted Path to Success
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, maxWidth: 900, fontStyle: 'italic', color: theme.palette.primary.dark }}>
                "We don't just track calories; we track **consistency, accountability, and outcomes**. Our system is the dedicated expert connecting human guidance with technological precision, ensuring your success isn't left to chance. This is the **structural difference** that guarantees your long-term wellness."
              </Typography>
               
               <Divider sx={{ my: 4 }} />

               <Grid container spacing={4}>
                  {/* Detailed Explanation 1: Pairing Model */}
                  <Grid item xs={12} md={6}>
                       <DMSDescription 
                            title="The Core Pairing Model (Mandatory SRS Requirement)"
                            body="The system mandates a **1:1 or 1:Many pairing** structure. The User is connected directly to a specialist Guide (Doctor, Trainer, etc.), who is responsible for creating the precise **Meal Plan** and monitoring the User's compliance, streaks, and physiological progress. This guarantees continuous, customized oversight, turning goals into habits."
                            icon={LoopIcon}
                            color={theme.palette.secondary.main}
                        />
                  </Grid>
                  
                  {/* Detailed Explanation 2: Interface Mechanics */}
                  <Grid item xs={12} md={6}>
                       <DMSDescription 
                            title="Intuitive, Role-Based Interface"
                            body="NutriGuide features separate dashboards to optimize workflow. **Guides** see comprehensive User Management, compliance analytics, and task assignment tools. **Users** see a simplified view focused on daily goals, **Food Logging**, and the secure **Messaging Panel**. This clarity drives efficiency for both roles and prevents distraction."
                            icon={PsychologyIcon}
                            color={theme.palette.warning.main}
                        />
                  </Grid>
               </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* ---------------- SECTION 3: KEY FEATURES GRID (Special Effects) ---------------- */}
      <Typography variant="h4" component="h3" gutterBottom align="center" fontWeight={700} sx={{ mb: 5 }}>
        Advanced Features Driving Your Success
      </Typography>

      <Grid container spacing={3}>
        {srsFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={featureCardStyle}>
              {/* Feature Icon */}
              <feature.icon color="primary" sx={{ fontSize: 40, mb: 1 }} /> 
              
              {/* Feature Name */}
              <Typography 
                variant="h6" 
                component="h4" 
                fontWeight={700} 
                gutterBottom 
                color="text.primary"
              >
                {feature.name}
              </Typography>
              
              {/* Feature Description */}
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;