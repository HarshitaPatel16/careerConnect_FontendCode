import React from "react";
import { Link } from "react-router-dom";
import "../otppage/otp.css";
import logo from "../../assets/CareerConnect-white-logo.png";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import API_URL from "../../service";
import { postCustomerotpData } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MuiOtpInput } from 'mui-one-time-password-input'
import "./otp.css"
import axios from "axios";

const Otp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('')
  const email = new URLSearchParams(window.location.search).get('email')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + "user/readOneuserOtp",
        { otp: otp ,
          email:email
        }
      );
      navigate(`/forgot?email=${email}`);
      // toast.success("Please check your email");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="otp">
      <Grid container className="justify-content-center ">
        <Grid item xs={10} md={4} lg={4}>
          <Card className="h-100">
            <CardContent>
              <Typography variant="h5" component="div"></Typography>
              <div className="right">
                <h1>Verify</h1>
                <span>Enter the OTP code sent to your email</span>
                <MuiOtpInput value={otp} onChange={handleChange} />
              </div>
              <button class="btn btn-primary mb-4" onClick={handleVerifyOTP}>Verify OTP</button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Otp;
