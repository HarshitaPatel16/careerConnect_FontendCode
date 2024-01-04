import { Link } from "react-router-dom";
import "./forgetPassword.css";
import logo from "../../assets/CareerConnect-white-logo.png";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addCreateCustomer } from "../../store/action/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../service";

const Forgot = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [isForgotButtonDisabled, setForgotButtonDisabled] = useState(true); // New state for button

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);

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

  function handleAddcustomer() {
    const formData = new FormData();

    // Append your form fields to the FormData object
    formData.append("oldPassword", oldPassword);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", name);

    dispatch(addCreateCustomer(API_URL, formData));
  }

  return (
    <div className="Forgot">
      <Grid container className="justify-content-center ">
        <Grid item xs={10} md={4} lg={4}>
          <Card className="h-100">
            <CardContent>
              <Typography variant="h5" component="div">

              </Typography>
              <div className="left h-100">
                <img src={logo} alt="" style={{height:"100%"}} />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                  alias totam numquam ipsa exercitationem dignissimos, error nam,
                  consequatur.
                </p>
                <span>Do you have an account?</span>
                <Link to="/login">
                  <button>Login</button>
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
              <div className="right ">
                <h1>Forgot</h1>
                <form>
                  <input
                    type="password"
                    placeholder="Old Password"
                    onChange={(e) => setoldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  
                  <button
                    disabled={isForgotButtonDisabled} // Disable the button based on validation status
                    onClick={handleAddcustomer}
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>

  );
};

export default Forgot;
