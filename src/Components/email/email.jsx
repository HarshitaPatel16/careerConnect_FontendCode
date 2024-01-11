// EmailInput.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import leftImg from "../../assets/login-left.png"
import logo from "../../assets/CareerConnect-black-logo.png";



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
  //   <Grid container className="justify-content-center ">
  //   <Grid item xs={10} md={4} lg={4}>
  //     <Card className="h-100">
  //       <CardContent>
  //         <Typography variant="h5" component="div">

  //         </Typography>
  //         <div className="right">
  //         <div>
  //     <h1>Enter Your Email</h1>
  //     <input
  //       type="email"
  //       placeholder="Enter your email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <button onClick={handleVerifyEmail}>Verify Email</button>
  //   </div>

  //         </div>
  //       </CardContent>
  //     </Card>
     
  //   </Grid>
  // </Grid>

  <div className="row  d-flex align-items-center">
  <div className="col-md-6">
    <img src={leftImg} alt="Background" className="p-0 m-0" style={{ height: "98vh", width: "50vw" }} />
  </div>
  <div className="col-md-6 mt-5 ">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="h-100 p-4">
          <CardContent>
            <img src={logo} alt="Background" className="p-0 m-0" />
            <h3 className="mb-5 fw-bold">Welcome To Career Connect </h3>
            <div className=" align-items-center">
              <h5>Forgot Password</h5>
              <form className=" p-5 align-items-center">
                <div className=" mb-3">
                  {/* <label>Email/Username</label> */}
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control p-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <button className="btn-login col-md-12 p-3">
                  Verify Email
                </button>
              </form>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
</div>
  
  );
};


export default EmailInput;
