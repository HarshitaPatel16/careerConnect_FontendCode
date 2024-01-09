// EmailInput.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from '@mui/material';


const EmailInput = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleVerifyEmail = () => {
    // Add logic to verify the email and send a verification link
    // This logic will depend on your backend implementation
    // For demonstration, navigate to the OTP screen
    navigate("/otp");
  };

  return (
    <Grid container className="justify-content-center ">
    <Grid item xs={10} md={4} lg={4}>
      <Card className="h-100">
        <CardContent>
          <Typography variant="h5" component="div">

          </Typography>
          <div className="right">
          <div>
      <h1>Enter Your Email</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleVerifyEmail}>Verify Email</button>
    </div>

          </div>
        </CardContent>
      </Card>
     
    </Grid>
  </Grid>
  
  );
};


export default EmailInput;
