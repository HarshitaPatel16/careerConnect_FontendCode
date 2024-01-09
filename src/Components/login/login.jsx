import React from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import logo from "../../assets/CareerConnect-white-logo.png";
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
    <div className="login">
      <Grid container className="justify-content-center ">
        <Grid item xs={10} md={4} lg={4}>
          <Card className="h-100">
            <CardContent>
              <Typography variant="h5" component="div">

              </Typography>
              <div className="left">
                <img src={logo} alt="" />
                {/* <h1>Carrer Connet</h1> */}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                  alias totam numquam ipsa exercitationem dignissimos, error nam,
                  consequatur.
                </p>
                <span>Don't you have an account?</span>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10} md={4} lg={4}>
          <Card className="h-100">
            <CardContent>
              <Typography variant="h5" component="div">

              </Typography>
              <div className="right">
                <h1>Login</h1>
                <form>
                  <input type="text" placeholder="Username" className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* <input type="password" placeholder="Password" className="form-control mt-3"
                      onChange={(e) => setPassword(e.target.value)}

                    /> */}
                  <div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="form-control mt-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div  className="d-flex justify-content-between">
                    <span type="button" onClick={togglePasswordVisibility}>
                      {showPassword ? 'Hide Passsword' : 'Show Password'}
                    </span>
                    <span className='fw-bold' style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>Forget Password?</span>
                    </div>
                  </div>
                  <button onClick={handleLogin} disabled={!password && !username}>Login</button>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer autoClose={2000} />

    </div>
  );
};

export default Login;
