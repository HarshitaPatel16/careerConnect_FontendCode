import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import SidebarRight from './Components/SidebarRight/SidebarRight';
import Login from './Components/login/login';
import Registration from './Components/register/Register';
import Navbar from "./Components/navbar/Navbar";
import Home from "./Components/Home/home";
import Job from './Components/job/job';
import Share from './Components/share/share';
import Forgot from './Components/forgetpassword/forgetPassword';
import ConnectionDetail from './Components/ConNectionDetail/connection';
import Post from './Components/post/Post';
import Posts from './Components/posts/Posts';
import ActivityPost from './Components/Activity/acivityview/ActivityPost';
import ActivityPosts from './Components/Activity/activitypost/ActivityPosts';
import Otp from './Components/otppage/otp';
import Email from './Components/email/email';
import Request from './Components/request/request';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Background.css"
import BackgroundAnimation from './Background';
import { DarkModeContext } from "./Components/context/darkModeContext"


function App() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("user_id") !== null;
  });

  useEffect(() => {
    // Update isLoggedIn in local storage whenever it changes
    localStorage.setItem("user_id", isLoggedIn ? localStorage.getItem("user_id") : null);
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
              <Route path="/detail/:user_id" element={<ConnectionDetail />} />
              <Route path="/post" element={<Post />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/email" element={<Email />} />
              <Route path="/activitypost" element={<ActivityPost />} />
              <Route path="/activityposts" element={<ActivityPosts />} />
              <Route path="/request" element={<Request />} />

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
