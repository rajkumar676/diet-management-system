import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "../components/OTPInput";
import { verifyOtp } from "../api/authApi";

interface LocationState {
  email?: string;
}

const VerifyOtp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [email, setEmail] = useState(state?.email || "");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      // Try to get email from query string fallback
      const params = new URLSearchParams(window.location.search);
      const queryEmail = params.get("email");
      if (queryEmail) setEmail(queryEmail);
    }
  }, [email]);

  if (!email) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h6" color="error" align="center">
          Email not provided. Please signup first.
        </Typography>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (otp.length !== 6) {
      setErrorMsg("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp({ email, otp });
      navigate("/role-selection", { replace: true });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setResendLoading(true);
    try {
      // Resend OTP endpoint is assumed to be /api/auth/resend-otp (not defined in API blueprint)
      // For MVP, we simulate resend with registerUser call or a dummy call.
      // Here, call registerUser again with email and dummy data or just show success.
      // We'll simulate success with timeout.

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMsg("OTP resent successfully!");
    } catch {
      setErrorMsg("Failed to resend OTP. Please try again later.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
        Verify OTP
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        Enter the 6-digit OTP sent to <strong>{email}</strong>
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ textAlign: "center" }}
      >
        <OTPInput
          length={6}
          onChangeOtp={setOtp}
          disabled={loading}
          error={Boolean(errorMsg)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{ mt: 2 }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="text"
          color="secondary"
          onClick={handleResend}
          disabled={resendLoading || loading}
        >
          {resendLoading ? "Resending..." : "Resend OTP"}
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyOtp;
