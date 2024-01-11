import { Link } from "react-router-dom";
import "./register.css";
import logo from "../../assets/CareerConnect-black-logo.png";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addCreateCustomer } from "../../store/action/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImg from "../../assets/login-left.png"


const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterButtonDisabled, setRegisterButtonDisabled] = useState(true); // New state for button
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const users = useSelector((state) => state.user);

  // Function to validate form fields
  const validateForm = () => {
    // Implement your validation logic here
    const isUsernameValid = username.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // Basic email validation
    const isNameValid = name.trim() !== "";
    const isPasswordValid = password.trim() !== "";

    // Set button disabled status based on validation
    setRegisterButtonDisabled(!(isUsernameValid && isEmailValid && isNameValid && isPasswordValid));
  };

  // Use useEffect to validate the form whenever form fields change
  useEffect(() => {
    validateForm();
  }, [username, email, name, password]);

  function handleAddcustomer() {
    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", name);

    dispatch(addCreateCustomer(API_URL, formData))
      .then((response) => {
        if (response && response.success) {
          // Show success toast
          toast.success('Registration successful!');
          // Redirect to login page or perform other actions
          navigate('/login');
        } else {
          // Show error toast if necessary
          toast.error('Registration failed. Please check your input.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show error toast
        toast.error('An error occurred. Please try again later.');
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  setTimeout(() => {
    setErrorMessage("");
  }, 5000);
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
                  <h5>Register</h5>
                  <form className=" p-5 align-items-center">
                    <div className=" mb-3">
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control p-3"
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className=" mb-3">
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control p-3"
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </div>
                    <div className=" mb-3">
                      <input
                        placeholder="Email"
                        className="form-control p-3"
                        onChange={(e) => setemail(e.target.value)}

                      />
                    </div>
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
                    </div>

                    <button className="btn-login col-md-12 mt-5 p-3" onClick={handleAddcustomer} disabled={isRegisterButtonDisabled} >
                      Register
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      {/* <ToastContainer autoClose={2000} /> */}
    </div>


  );
};

export default Register;
