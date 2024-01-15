import React, { useContext, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import "./Background.css";
import ConnectionDetail from './Components/ConNectionDetail/connection';
import Home from "./Components/Home/home";
import Profile from './Components/Profile/Profile';
import SidebarRight from './Components/SidebarRight/SidebarRight';
import { DarkModeContext } from "./Components/context/darkModeContext";
import Email from './Components/email/email';
import Forgot from './Components/forgetpassword/forgetPassword';
import Job from './Components/job/job';
import Login from './Components/login/login';
import Navbar from "./Components/navbar/Navbar";
import Otp from './Components/otppage/otp';
import Post from './Components/post/Post';
import Posts from './Components/posts/Posts';
import Registration from './Components/register/Register';
import Share from './Components/share/share';


function App() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("user_id") !== null;
  });

  useEffect(() => {
    // Update isLoggedIn in local storage whenever it changes
    localStorage.setItem("user_id", isLoggedIn ? localStorage.getItem("user_id")  : null);
  }, [isLoggedIn]);
  console.log(isLoggedIn, "userIsLoggedIn");

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
     
  <Router>
        <Routes>
          {/* Public routes accessible to all users */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Routes accessible only when logged in */}
          {isLoggedIn && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/sidebar" element={<SidebarRight />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/home" element={<Home />} />
              <Route path="/job" element={<Job />} />
              <Route path="/share" element={<Share />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/detail" element={<ConnectionDetail />} />
              <Route path="/post" element={<Post />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/email" element={<Email />} />
            </>
          )}

          {/* Redirect to login for protected routes when not logged in */}
          {!isLoggedIn && (
            <Route path="/*" element={<Login />} />
          )}
        </Routes>
      </Router>
      <ToastContainer />
      {/* <BackgroundAnimation/> */}
    </div>
  );
}

export default App;
