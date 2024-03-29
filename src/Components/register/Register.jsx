import "../register/register.css";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addCreateCustomer } from "../../store/action/action";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImg from "../../assets/new-img121.png";
import logo from "../../assets/CareerConnect-black-logo.png";
import API_URL from "../../service";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterButtonDisabled, setRegisterButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);

  const validateForm = () => {
    const isUsernameValid = username.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isNameValid = name.trim() !== "";
    const isPasswordValid = password.trim() !== "";

    setRegisterButtonDisabled(!(isUsernameValid && isEmailValid && isNameValid && isPasswordValid));
  };

  useEffect(() => {
    validateForm();
  }, [username, email, name, password]);

  function handleAddcustomer() {
    const formData = new FormData();

    // Append your form fields to the FormData object...
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", name);

    dispatch(addCreateCustomer(API_URL, formData));
    toast.success("Signed in successfully!")
    handleLogin()
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="row d-flex align-items-center" style={{ height: '100vh' }}>
      <div className="col-md-5 d-none d-md-block mt-5">
        <img src={leftImg} alt="Background" className="p-0 m-0"/>
      </div>
      <div className="col-md-7 mt-5 w-85vh">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card className="h-100 p-3">
              <CardContent>
                <img src={logo} alt="Background" className="p-0 m-0" />
                <h3 className="mb-3">Welcome To Career Connect </h3>
                <div className="align-items-center">
                  <h5>Register</h5>
                  <form className="p-3 align-items-center">
                    <div className="mb-3">
                    <label className="inputbox mb-1">Name</label>

                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                    <label className="inputbox mb-1">Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                    <label className="inputbox mb-1">Email</label>
                      <input
                        placeholder="email@gmail.com"
                        className="form-control"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <label className="inputbox mb-1">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <span type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                      </span>
                    </div>
                    <button className="btn-login col-md-12 mt-3 p-2" onClick={handleAddcustomer} disabled={isRegisterButtonDisabled}>
                      Register
                    </button>
                  </form>
                </div>
                <div>Already have an account? <span className="text-primary fw-bold" style={{ cursor: "pointer" }} onClick={handleLogin}>Log In</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
