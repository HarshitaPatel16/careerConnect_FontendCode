import { Link } from "react-router-dom";
import "./forgetPassword.css";
import logo from "../../assets/CareerConnect-black-logo.png";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addCreateCustomer } from "../../store/action/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../service";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImg from "../../assets/new-img121.png"
import BackgroundAnimation from "../../Background";
import { toast } from 'react-toastify';
import axios from "axios";


const Forgot = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotButtonDisabled, setForgotButtonDisabled] = useState(true); // New state for button
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const Email = new URLSearchParams(window.location.search).get('email');
  console.log(Email, 'Email');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate("/")
  };

  const handleLogin = () => {
    // Your logic for handling login
  };

  // Function to validate form fields
  const validateForm = () => {
    // Implement your validation logic here
    const isoldPasswordValid = oldPassword.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // Basic email validation
    const isNameValid = name.trim() !== "";
    const isPasswordValid = password.trim() !== "";

    // Set button disabled status based on validation
    setForgotButtonDisabled(!(isoldPasswordValid && isEmailValid && isNameValid && isPasswordValid));
  };

  // Use useEffect to validate the form whenever form fields change
  useEffect(() => {
    validateForm();
  }, [oldPassword, email, name, password]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
    // Add a condition to check if password is equal to newpassword
    if (password === newpassword) {
      try {
        const response = await axios.post(
          API_URL + "user/updatePassword",
          {
            email: Email,
            password: password,
          }
        );
        navigate("/");
        toast.success("Password Updated Successfully");
      } catch (error) {
        console.error('Error:', error);
        toast.error("Email Not Found");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };
  

  return (

    <div className="row  d-flex align-items-center">
      
    <div className="col-md-6">
      <img src={leftImg} alt="Background" className="p-0 m-0" />
    </div>
    <div className="col-md-6 mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="h-100 p-4">
            <CardContent>
              <img src={logo} alt="Background" className="p-0 m-0" />
              <h3 className="mb-3">Welcome To Career Connect </h3>
              <div className=" align-items-center">
                <h5>Forgot Password</h5>
                <form className=" p-5 align-items-center">
                  <div className=" mb-3">
                  <label className="inputbox mb-2">Password</label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control "
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <label className="inputbox mb-2">Confirm Password</label>
                  <div className=" mb-5">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="form-control "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                      </span>
                      <span className='fw-bold' style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                        Login
                      </span>
                    </div>
                  </div>
                  
                  <button onClick={handleUpdatePassword} disabled={!password && !newPassword} className="btn-login col-md-12 p-2">
                     Login
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
    <BackgroundAnimation/>
    <ToastContainer autoClose={2000} />
  </div>

  );
};

export default Forgot;
