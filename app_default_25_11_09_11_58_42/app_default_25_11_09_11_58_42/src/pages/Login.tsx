// src/pages/Login.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card, // Added Card for professional container
  useTheme, // Added useTheme for custom styles
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailToValidate: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setEmailError(false);

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setEmailError(true);
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      
      // Handle login and context update
      const role = data.role === "unassigned" ? null : data.role;
      login(data.token, role);

      // --- FIXED/SYNCHRONIZED Redirect Logic ---
      if (data.role === "unassigned" || !data.role) {
        navigate("/onboarding/role", { replace: true });
      } else if (data.role === "user") {
        navigate("/user/dashboard", { replace: true }); // Use slash format
      } else if (data.role === "guide") {
        navigate("/guide/dashboard", { replace: true }); // Use slash format
      } else {
        navigate("/", { replace: true }); // Fallback to home
      }
      
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Login failed. Invalid credentials or network error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Card 
        elevation={10} 
        sx={{ 
          p: 4, 
          borderRadius: '16px', 
          border: '2px solid #e0e0e0',
          textAlign: 'center'
        }}
      >
        <LockOpenIcon color="primary" sx={{ fontSize: 60, mb: 1 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.dark">
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Access your structured meal plans and guided support.
        </Typography>
        
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
            autoFocus
            variant="outlined"
            error={emailError}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            autoComplete="current-password"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ 
              mt: 2,
              padding: '12px 0',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '8px',
              boxShadow: theme.shadows[10],
              '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: theme.shadows[15],
              }
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
          >
            {loading ? "Verifying Credentials..." : "Secure Login"}
          </Button>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account? <Button onClick={() => navigate("/signup")} size="small">Sign Up</Button>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;