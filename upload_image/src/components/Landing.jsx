import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const landingStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(to bottom, #E1E8F5, #FFFCF7)"
  };

  return (
    <div style={landingStyles}>
      <img src={landing_image} alt="landing" style={{ maxWidth: "40%" }} />
      <Typography variant="h1">Learn, Earn, Save and Serve.</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up for Free!
      </Button>
    </div>
  );
};

export default Landing;
