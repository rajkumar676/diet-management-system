import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onboardGuide } from "../api/authApi";

const specializations = [
  "Doctor",
  "Gym Trainer",
  "Parent",
  "Nutritionist",
  "Coach",
  "Other Guardian",
];

const GuideOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!specialization) {
      setErrorMsg("Please select a specialization.");
      return;
    }

    setLoading(true);
    try {
      await onboardGuide({ specialization });
      setSuccessMsg("Onboarding successful!");
      navigate("/guide-dashboard", { replace: true });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to onboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
        Guide Specialization Onboarding
      </Typography>
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMsg}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2 }}>
            Select your specialization
          </FormLabel>
          <RadioGroup
            aria-label="guide specialization"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            {specializations.map((spec) => (
              <FormControlLabel
                key={spec}
                value={spec}
                control={<Radio required />}
                label={spec}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default GuideOnboarding;
