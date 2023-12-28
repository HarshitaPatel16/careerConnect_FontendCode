import React from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import logo from "../../assets/CareerConnect-white-logo.png";
import API_URL from "../../service";
import { postCustomerLoginData } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";

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

            setitem(itemdata.id);
            localStorage.setItem("user_id", itemdata.id);

            // localStorage.setItem("id", itemdata.id);
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
      console.log("API Response:", response);

      if (response && response.data.message === "User Login Successfully") {
        console.log("Successful login");
        toast.success("Login Successfully");
      } else {
        console.log("Invalid login attempt");
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // const handleLogin = () => {
  //   login();
  // };

  return (
    <div className="login">
      <div className="card">
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
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                          />
            <input type="password" placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}

             />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
