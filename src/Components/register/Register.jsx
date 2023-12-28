import { Link } from "react-router-dom";
import "./register.css";
import logo from "../../assets/CareerConnect-white-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { addCreateCustomer } from "../../store/action/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../service";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [isRegisterButtonDisabled, setRegisterButtonDisabled] = useState(true); // New state for button

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    dispatch(addCreateCustomer(API_URL, formData));
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <img src={logo} alt="" />
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
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setname(e.target.value)}
            />
            <button
              disabled={isRegisterButtonDisabled} // Disable the button based on validation status
              onClick={handleAddcustomer}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
