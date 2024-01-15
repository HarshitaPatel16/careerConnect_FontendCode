
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import leftImg from "../../assets/new-img121.png"
import logo from "../../assets/CareerConnect-black-logo.png";
import axios from "axios";
import API_URL from "../../service";
import { toast } from 'react-toastify';
import BackgroundAnimation from "../../Background";
import "./email.css"


const EmailInput = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    console.log("API");
    try {
        const response = await axios.post(
            API_URL + "user/forgetPassword",
            {
                email: email,
            },
          
        );
        navigate(`/otp?email=${email}`);
        toast.success("Please check your email")
    } catch (error) {
        console.error('Error:', error);
        toast.error("Email Not Found")
    }
}


  return (

  <div className="row  d-flex align-items-center">
  <div className="col-md-5 d-none d-md-block mt-5">
    <img src={leftImg} alt="Background" className="p-0 m-0"/>
  </div>
  <div className="col-md-7 mt-5 w-85">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="h-100 p-4 email-card">
          <CardContent>
            <img src={logo} alt="Background" className="p-0 m-0" />
            <h3 className="mb-3 fw-bold">Welcome To Career Connect </h3>
            <div className=" align-items-center">
              <h5>Forgot Password</h5>
              <form className=" p-5 align-items-center">
                <div className=" mb-3">
                <label className="inputbox mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    className="form-control p-2"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <button className="btn-login col-md-12 p-2" onClick={handleVerifyEmail}>
                  Verify Email
                </button>
              </form>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
  <BackgroundAnimation/>
</div>
  
  );
};


export default EmailInput;
