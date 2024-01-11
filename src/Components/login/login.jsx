import React from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import logo from "../../assets/CareerConnect-black-logo.png";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import API_URL from "../../service";
import { postCustomerLoginData } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leftImg from "../../assets/login-left.png"

const Login = () => {

  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [item, setitem] = useState("");
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  setTimeout(() => {
    setErrorMessage("");
  }, 5000);
  //api calling for login start//

  useEffect(() => {
    if (
      localStorage.getItem("responsedata") !== null &&
      localStorage.getItem("responseData") !== undefined
    ) {
      if (User !== null && User !== undefined) {
        if (User.customerloginData !== null && User.customerloginData !== undefined) {
          if (
            User.customerloginData !== null &&
            User.customerloginData !== undefined &&
            User.customerloginData.message !== "User not found"
          ) {
            const itemdata = User.customerloginData.data;

            setitem(itemdata.user_id);
            localStorage.setItem("user_id", itemdata.user_id);
            localStorage.setItem("username", itemdata.username);
            navigate("/");
          }
        }
      }
    }
  }, [User, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await dispatch(postCustomerLoginData(API_URL, data));
      console.log("API Response:", response.data); // Log the entire response for debugging

      if (response && response.data.message === "User Successfully") {
        console.log("Successful login");
        toast.success("Login Successfully");
      } else if (response && response.data.message === "User not found") {
        console.log("Invalid username or password");
        toast.error("Invalid username or password");
      } else {
        console.log("Unexpected response:", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     username: username,
  //     password: password,
  //   };

  //   try {
  //     const response = await dispatch(postCustomerLoginData(API_URL, data));
  //     console.log("API Response:", data);
  //     console.log(response.data.message,"Invalid login attempt");

  //     if (response && response.data.message === "User Successfully") {
  //       console.log(response.data.message,"Successful login");
  //       toast.success("Login Successfully");
  //     } else if (response && response.data.message === "User not found")
  //      {
  //       toast.error("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  const handleForgotPassword = () => {
    navigate("/email")
  };

  return (
    <div className="row  d-flex align-items-center">
      <div className="col-md-6 d-none d-md-block">
        <img src={leftImg} alt="Background" className="p-0 m-0" style={{ height: "98vh", width: "50vw" }} />
      </div>
      <div className="col-md-6 mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card className="h-100 p-4">
              <CardContent>
                <img src={logo} alt="Background" className="p-0 m-0" />
                <h3 className="mb-3">Welcome To Career Connect </h3>
                <div className=" align-items-center">
                  <h5>Login</h5>
                  <form className=" p-5 align-items-center">
                    <div className=" mb-3">
                      {/* <label>Email/Username</label> */}
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control p-3"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className=" mb-5">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="form-control p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="d-flex justify-content-between mt-2">
                        <span type="button" onClick={togglePasswordVisibility}>
                          {showPassword ? 'Hide Password' : 'Show Password'}
                        </span>
                        <span className='fw-bold' style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                          Forget Password?
                        </span>
                      </div>
                    </div>
                    
                    <button onClick={handleLogin} disabled={!password && !username} className="btn-login col-md-12 p-3">
                       Login
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>

  );
};

export default Login;
