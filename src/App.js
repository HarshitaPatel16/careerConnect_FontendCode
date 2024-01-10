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
import Otp from './Components/otppage/otp';
import Email from './Components/email/email';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Background.css"
import BackgroundAnimation from './Background';
import { DarkModeContext } from "./Components/context/darkModeContext"


function App() {
  const { toggle, darkMode } = useContext(DarkModeContext);


  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
     
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<SidebarRight />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/navbar"  element={<Navbar/>} />
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/share" element={<Share />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/detail" element={<ConnectionDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/email" element={<Email />} />




        </Routes>
      </Router>
      <ToastContainer />
      {/* <BackgroundAnimation/> */}
    </div>
  );
}

export default App;
