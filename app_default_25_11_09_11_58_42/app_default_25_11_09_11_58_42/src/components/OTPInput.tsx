import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface OTPInputProps {
  length?: number;
  onChangeOtp: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onChangeOtp,
  disabled = false,
  error = false,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    onChangeOtp(otpValues.join(""));
  }, [otpValues, onChangeOtp]);

  const focusInput = (index: number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]?.focus();
      inputsRef.current[index]?.select();
    }
  };

  // FIX 1: Explicitly define the event type as HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) {
      return; // Only digits allowed
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = val.slice(-1);
    setOtpValues(newOtpValues);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  // FIX 2: Explicitly define the event type as HTMLInputElement
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtpValues = [...otpValues];
      if (otpValues[index]) {
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
        focusInput(index);
      } else if (index > 0) {
        focusInput(index - 1);
        const prevValues = [...otpValues];
        prevValues[index - 1] = "";
        setOtpValues(prevValues);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(paste)) return;
    const pasteValues = paste.split("");
    const newOtpValues = [...otpValues];
    for (let i = 0; i < length; i++) {
      newOtpValues[i] = pasteValues[i] || "";
    }
    setOtpValues(newOtpValues);
    // Focus next empty input or last
    for (let i = 0; i < length; i++) {
      if (!newOtpValues[i]) {
        focusInput(i);
        return;
      }
    }
    focusInput(length - 1);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={1}
      // Added type cast to handlePaste event to ensure compatibility with Box element
      onPaste={handlePaste as React.ClipboardEventHandler<HTMLDivElement>}
      sx={{ marginY: 2 }}
    >
      {Array.from({ length }).map((_, i) => (
        <TextField
          key={i}
          inputProps={{
            style: { textAlign: "center", fontSize: "1.5rem", width: "3rem", height: "3rem" },
            maxLength: 1,
            "aria-label": `OTP digit ${i + 1}`,
          }}
          value={otpValues[i]}
          // FIX 3: Type assertion for onChange event
          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, i)}
          // FIX 4: Type assertion for onKeyDown event
          onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, i)}
          disabled={disabled}
          error={error}
          type="text"
          autoComplete="one-time-code"
          inputRef={(el: HTMLInputElement | null) => (inputsRef.current[i] = el)}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default OTPInput;