import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Button, 
  useTheme, 
  Card, 
  CardContent 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// FIX: Corrected the path to look in the current folder (./)
import heroImage from './dms_home.jpg'; 

const HERO_IMAGE_URL = heroImage; 

// Sample Testimonials for the Horizontal Slider
const testimonials = [
  { name: "Dr. L. Sharma", review: "The Guide-User pairing model ensures adherence, dramatically improving patient outcomes. This system is genuinely professional." },
  { name: "Priya M.", review: "Tracking my 30-day streak is addictive! It gave me the accountability I needed to hit my fitness goals. Highly recommend!" },
  { name: "Coach D.", review: "I can assign plans and monitor progress visually without endless texts. It streamlines my coaching workflow perfectly." },
  { name: "Aarav V.", review: "The platform is clean and simple. Logging meals and checking macros takes seconds, unlike my previous app." },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGetStarted = () => {
    // Navigates directly to the signup page to start the onboarding flow
    navigate("/signup"); 
  };

  // Custom styling for the 3D-effect button (Success color for motivation)
  const button3DStyle = {
    backgroundColor: theme.palette.success.main, 
    color: theme.palette.common.white,
    padding: '15px 40px',
    fontSize: '1.2rem',
    fontWeight: 700,
    borderRadius: '12px',
    transition: 'all 0.3s ease-in-out',
    
    // Initial 3D effect
    boxShadow: `0 8px 15px rgba(0, 128, 0, 0.4), 0 3px 5px rgba(0, 128, 0, 0.2)`,
    
    // Hover effect: lifts the button slightly
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      boxShadow: `0 10px 20px rgba(0, 128, 0, 0.6), 0 4px 6px rgba(0, 128, 0, 0.3)`,
      transform: 'translateY(-2px)',
    },
    
    // Active/Click effect: pushes the button down
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: `0 5px 10px rgba(0, 128, 0, 0.3), 0 2px 3px rgba(0, 128, 0, 0.1)`,
    }
  };


  return (
    <Box sx={{ width: '100%' }}>

      {/* ------------------- SECTION 1: HERO (Full Viewport Height) ------------------- */}
      <Box
        sx={{
          // FIX: Use the imported URL
          backgroundImage: `url(${HERO_IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundAttachment: 'fixed', // Key for professional parallax/sticky feel
          backgroundPosition: "center",
          height: '100vh', // Full viewport height
          width: '100%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: 'relative',
          overflow: 'hidden',
          "&::before": { // Dark overlay for readability
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        <Box sx={{ zIndex: 1, p: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 900, textShadow: "0 0 10px rgba(0,0,0,0.9)", mb: 3 }}
          >
            Personalized Expert Guidance
          </Typography>
          
          {/* Motivational Quote */}
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 6, fontStyle: 'italic', maxWidth: 900, mx: 'auto', textShadow: "0 0 5px rgba(0,0,0,0.8)" }}
          >
            "Your health is equally important to us. Achieve consistency with professional, human support."
          </Typography>

          <Button
            sx={button3DStyle} // Applying the custom 3D style
            onClick={handleGetStarted}
            endIcon={<ArrowForwardIcon />}
          >
            Get Started & Define Your Goals
          </Button>
        </Box>
      </Box>

      {/* ------------------- SECTION 2: WEBSITE BRIEF/OVERVIEW ------------------- */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={700} color="text.primary">
          How the Diet Management System Transforms Your Health
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          We bridge the gap between nutritional science and daily life, providing a platform where you are constantly supported by an expert. **See our About Us page for all 9 detailed features.**
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderBottom: `4px solid ${theme.palette.primary.main}`, borderRadius: '4px', height: '100%' }}>
              <Typography variant="h5" fontWeight={600} color="primary.dark" gutterBottom>Dual Role Pairing</Typography>
              <Typography variant="body1" color="text.secondary">Connect as a **User** with a designated **Guide** (Doctor, Trainer, Parent) for mandatory accountability.</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderBottom: `4px solid ${theme.palette.success.main}`, borderRadius: '4px', height: '100%' }}>
              <Typography variant="h5" fontWeight={600} color="success.main" gutterBottom>Real-Time Tracking</Typography>
              <Typography variant="body1" color="text.secondary">Log meals easily and instantly view your macro calculations and monitor your **30-day streak** for consistency.</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, borderBottom: `4px solid ${theme.palette.warning.main}`, borderRadius: '4px', height: '100%' }}>
              <Typography variant="h5" fontWeight={600} color="warning.main" gutterBottom>Secure Communication</Typography>
              <Typography variant="body1" color="text.secondary">Use our secure, OTP-verified chat for direct messaging and personalized feedback from your expert Guide.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* ------------------- SECTION 3: CUSTOMER FEEDBACK SLIDER ------------------- */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h3" gutterBottom align="center" fontWeight={700} sx={{ mb: 4 }}>
          What People Are Saying
        </Typography>

        <Box 
          sx={{
            display: 'flex',
            overflowX: 'scroll', // Enables horizontal sliding
            gap: 3,
            py: 3,
            // Styling for professional slider look
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none', // IE and Edge
            scrollSnapType: 'x mandatory',
          }}
        >
          {testimonials.map((t, index) => (
            <Card 
              key={index} 
              elevation={8}
              sx={{ 
                minWidth: { xs: '85%', sm: 400, md: 350 }, // Fixed card size for sliding effect
                scrollSnapAlign: 'start',
                borderRadius: '12px',
                p: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent>
                <FormatQuoteIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  "{t.review}"
                </Typography>
                <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                  - {t.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;