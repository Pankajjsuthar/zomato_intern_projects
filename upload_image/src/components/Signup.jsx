import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.confirmPassword !== formData.password) {
      alert("passwords didn't match.");
    } else {
      {
        try {
          const response = await axios.post(
            "http://localhost:3000/user/signup",
            formData
          );
          if (response.status === 200) {
            console.log("Signup successful.");
            navigate("/login");
          } else {
            console.log("Error");
          }
        } catch (error) {
          console.error("Error while signing up:", error.message);
        }
      }
    }
  };
  

  const landingStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, #E1E8F5, #FFFCF7)",
  };

  return (
    <div
    style={landingStyles}>

    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Already have an account?{" "}
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
};

export default Signup;
