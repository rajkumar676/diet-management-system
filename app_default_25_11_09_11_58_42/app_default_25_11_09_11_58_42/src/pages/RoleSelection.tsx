import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleSelectGuide = () => {
    setUserRole("guide");
    navigate("/guide-onboarding", { replace: true });
  };

  const handleSelectUser = () => {
    setUserRole("user");
    navigate("/user-dashboard", { replace: true });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
        Select Your Role
      </Typography>
      <Grid container spacing={6} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item xs={12} md={5}>
          <Card
            variant="outlined"
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                I am a Guide / Advisor
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Provide expert guidance and support to users seeking personalized diet plans.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSelectGuide}
                aria-label="Select Guide Role"
              >
                Select Guide Role
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card
            variant="outlined"
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                I am a User / Receiver
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Receive personalized diet plans and expert advice tailored to your needs.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSelectUser}
                aria-label="Select User Role"
              >
                Select User Role
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoleSelection;
