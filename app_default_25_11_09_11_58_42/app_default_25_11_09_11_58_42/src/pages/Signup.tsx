import React, { useState, useMemo } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Card,
    Divider,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Assuming useAuth is imported from your actual context file:
// import { useAuth } from "../context/AuthContext"; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

// --- MOCK AUTH CONTEXT HOOK ---
// This mocks the 'login' function you'd get from your AuthContext.
// In a real app, replace this entire block with the actual import:
// const useAuth = () => { /* ... your logic ... */ };
const useAuth = () => ({ 
    login: (token: string, role: string) => { 
        console.log(`MOCK: Setting Auth Context with Role: ${role} and Token: ${token}`);
        // This is where your actual AuthContext would save the state and localStorage.
    } 
});


// --- Temporarily defined types for compilation (MUST match authApi payload) ---
interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    age: number;
    role: 'user' | 'guide';
    specialization: string; // The specific type (Doctor, Trainee, etc.)
}

// NOTE: We change the mock to return token/role, simulating a successful API call + login
const registerUserAndLoginMock = async (payload: RegisterUserPayload) => {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Registration attempt successful:", payload);
    
    // MOCK RESPONSE: Simulate the final server response after a successful sign-up/login flow
    return { 
        token: `mock-token-for-${payload.role}`, 
        role: payload.role 
    };
};

const registerUserTyped = registerUserAndLoginMock as (payload: RegisterUserPayload) => Promise<{ token: string, role: 'user' | 'guide' }>;

// --- Role Data Mapping (Updated for logical flow) ---
const GUIDE_OPTIONS = [
    { value: 'doctor', label: 'Doctor / Physician' },
    { value: 'trainer', label: 'Gym Trainer / Coach' },
    { value: 'nutritionist', label: 'Nutritionist / Dietitian' },
    { value: 'parent', label: 'Parent / Caretaker' },
];

const USER_OPTIONS = [
    { value: 'patient', label: 'Patient (Medical Guidance)' },
    { value: 'trainee', label: 'Gym Trainee (Fitness Goal)' },
];

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { login } = useAuth(); // Destructure the mock/actual login function

    // Primary User States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    
    // Secondary / Registration States
    const [gender, setGender] = useState("");
    const [age, setAge] = useState<number | ''>('');
    const [role, setRole] = useState<'user' | 'guide' | ''>('');
    const [specialization, setSpecialization] = useState("");
    
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);


    // Memoize the specialization options based on the chosen role
    const currentSpecializationOptions = useMemo(() => {
        if (role === 'guide') return GUIDE_OPTIONS;
        if (role === 'user') return USER_OPTIONS;
        return [];
    }, [role]);

    const validateEmail = (emailToValidate: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate);
    const validatePhone = (phoneToValidate: string) => /^[0-9]{7,15}$/.test(phoneToValidate);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setEmailError(false);

        // --- Client-Side Validation ---
        if (!name.trim()) return setErrorMsg("Full Name is required.");
        if (!validateEmail(email)) { setEmailError(true); return setErrorMsg("Please enter a valid email address."); }
        if (password.length < 8) return setErrorMsg("Password must be at least 8 characters for security.");
        if (!validatePhone(phone)) return setErrorMsg("Please enter a valid phone number (7-15 digits).");
        if (!gender || !age) return setErrorMsg("Gender and Age are required for diet analysis.");
        if (!role || !specialization) return setErrorMsg("Please select your Role and Specific Type.");

        setLoading(true);
        try {
            const registrationPayload: RegisterUserPayload = {
                name,
                email,
                password,
                phone,
                gender,
                age: Number(age),
                role: role as 'user' | 'guide',
                specialization,
            };
            
            // Execute the mock registration/login process
            const response = await registerUserTyped(registrationPayload);
            
            // 1. SET AUTH STATE: Update AuthContext state immediately to bypass ProtectedRoute block
            login(response.token, response.role);

            // 2. REDIRECT: Go directly to the correct dashboard using the synchronized paths
            const destinationPath = response.role === 'guide' ? "/guide/dashboard" : "/user/dashboard";

            console.log("Registration & Mock Login Successful. Redirecting directly to:", destinationPath);

            // Final Redirect
            navigate(destinationPath, { replace: true });
            
        } catch (err) {
            setErrorMsg(
                err instanceof Error
                    ? err.message
                    : "Registration failed. Check if email/phone is already registered."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
            <Card elevation={15} sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '20px',
                border: '3px solid',
                borderColor: theme.palette.primary.light
            }}>
                <Box textAlign="center" sx={{ mb: 4 }}>
                    <PersonAddIcon color="primary" sx={{ fontSize: 60, mb: 1 }} />
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.dark">
                        Secure Registration
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Join NutriGuide as a User or Expert. All fields are mandatory.
                    </Typography>
                </Box>
                
                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMsg(null)}>
                        {errorMsg}
                    </Alert>
                )}
                
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        
                        {/* 1. CORE IDENTITY & SECURITY */}
                        <Grid item xs={12}>
                            <TextField label="Full Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} variant="outlined" autoComplete="name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} autoComplete="new-password" helperText="Minimum 8 characters" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} autoComplete="email" variant="outlined" error={emailError} helperText={emailError ? "Invalid email format." : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Mobile Number" type="tel" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={loading} autoComplete="tel" helperText="Digits only, for OTP verification" variant="outlined" />
                        </Grid>

                        {/* 2. PHYSICAL ATTRIBUTES */}
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 1, mb: 2 }}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">PHYSICAL ATTRIBUTES</Typography>
                            </Divider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required variant="outlined">
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    label="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value as string)}
                                    disabled={loading}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField label="Age" type="number" fullWidth value={age} onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))} required disabled={loading} variant="outlined" inputProps={{ min: 10, max: 120 }} helperText="Required for BMI/Calorie calculations" />
                        </Grid>

                        {/* 3. ROLE SELECTION GROUP */}
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">ROLE SELECTION</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required variant="outlined">
                                <InputLabel id="role-label">I am registering as...</InputLabel>
                                <Select
                                    labelId="role-label"
                                    label="I am registering as..."
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value as 'user' | 'guide');
                                        setSpecialization(''); // Reset specialization when role changes
                                    }}
                                    disabled={loading}
                                >
                                    <MenuItem value="guide">Guide / Advisor (Doctor, Trainer, Parent)</MenuItem>
                                    <MenuItem value="user">User / Receiver (Patient, Trainee)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        {/* 4. ROLE SPECIALIZATION DROPDOWN (Dynamic and Conditional) */}
                        {role && (
                            <Grid item xs={12}>
                                <FormControl fullWidth required variant="outlined" sx={{ mt: -1 }}>
                                    <InputLabel id="specialization-label">Select Your Specific Role</InputLabel>
                                    <Select
                                        labelId="specialization-label"
                                        label="Select Your Specific Role"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value as string)}
                                        disabled={loading}
                                    >
                                        <MenuItem value="" disabled>
                                            {role === 'guide' ? 'Choose your professional capacity' : 'Choose your role type'}
                                        </MenuItem>
                                        {currentSpecializationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                        
                        {/* Submission Button */}
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{
                                    padding: '14px 0',
                                    fontWeight: 800,
                                    fontSize: '1.2rem',
                                    borderRadius: '10px',
                                    boxShadow: '0 6px 12px rgba(0, 100, 255, 0.4)',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.primary.dark,
                                        boxShadow: '0 8px 16px rgba(0, 100, 255, 0.6)',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    }
                                }}
                                disabled={loading || !role || !specialization} // Disable if fields are incomplete
                                startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SettingsAccessibilityIcon />}
                            >
                                {loading ? "Processing Registration..." : "Finalize Registration & Go to Dashboard"}
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Card>
        </Container>
    );
};

export default Signup;