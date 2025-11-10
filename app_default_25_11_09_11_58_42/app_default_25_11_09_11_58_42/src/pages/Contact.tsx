import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
  useTheme,
  Divider,
} from "@mui/material";
import axios from "axios";
// Importing professional icons
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Contact: React.FC = () => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (emailToValidate: string) => {
    // Standard email regex for strong validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmailError(false);

    if (!name.trim() || !message.trim()) {
      setErrorMsg("Name and message are required.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Please provide a valid email address.");
      setEmailError(true);
      return;
    }

    setLoading(true);
    try {
      // NOTE: Replace this placeholder with your actual Express backend endpoint
      await axios.post("http://localhost:5000/api/contact/submit", { 
        name,
        email,
        message,
      });
      setSuccessMsg("Thank you! Your message has been sent successfully. We will respond shortly.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      // A professional application handles specific backend errors
      setErrorMsg("Failed to send message. Server connection error or rate limit exceeded.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom align="center" color="primary.dark">
        Contact & Support Center
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        We are here to help you with onboarding, technical issues, or partnership inquiries.
      </Typography>
      
      {/* Alerts for feedback */}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMsg(null)}>
          {errorMsg}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMsg(null)}>
          {successMsg}
        </Alert>
      )}

      <Grid container spacing={5}>
        
        {/* LEFT COLUMN: Contact Information and Logos */}
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: '100%', borderRadius: '12px', p: 3, backgroundColor: theme.palette.grey[50] }}>
            <CardContent>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
                <SupportAgentIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={700}>
                  Get In Touch
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Email Contact */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>Email Support</Typography>
                  <Typography variant="body2" color="text.secondary">support@nutriguide.com</Typography>
                </Box>
              </Box>

              {/* Phone Contact */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>Phone (Random Placeholder)</Typography>
                  <Typography variant="body2" color="text.secondary">+91 98765 43210</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                DMS Headquarters (NutriGuide), 14th Floor, Tech Tower, City Center, IN
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT COLUMN: The Interactive Form (Leave Your Review/Message) */}
        <Grid item xs={12} md={8}>
          <Card elevation={5} sx={{ height: '100%', borderRadius: '12px', p: 4 }}>
            <CardContent>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                    Leave Your Review or Inquiry
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                                autoComplete="name"
                                variant="outlined" // Professional look
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                error={emailError} // Highlighting error state
                                helperText={emailError ? "Please enter a valid email address." : ""}
                                autoComplete="email"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    
                    <TextField
                        label="Message / Inquiry Details"
                        fullWidth
                        margin="normal"
                        multiline
                        minRows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        disabled={loading}
                        variant="outlined"
                        sx={{ mt: 1, mb: 2 }}
                    />
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        endIcon={<SendIcon />}
                        sx={{ 
                            mt: 2,
                            padding: '12px',
                            fontWeight: 700,
                            boxShadow: theme.shadows[10], // Professional button shadow
                            '&:hover': {
                                boxShadow: theme.shadows[15],
                            }
                        }}
                        disabled={loading}
                    >
                        {loading ? "Sending Message..." : "Send Message"}
                    </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;