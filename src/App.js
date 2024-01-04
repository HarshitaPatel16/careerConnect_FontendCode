import React, { useState, useEffect } from 'react';
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    applyTheme();
  }, [isDarkMode]);
  const applyTheme = () => {
    document.documentElement.className = isDarkMode ? 'dark-mode' : 'light-mode';
  };

  const toggleTheme = () => {
    // Toggle between dark and light modes
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Toggle button to switch between dark and light modes */}
      <button onClick={toggleTheme}>Toggle Theme</button>

      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<SidebarRight />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/navbar" element={<Navbar  toggleTheme={toggleTheme} />} />
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/share" element={<Share />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
