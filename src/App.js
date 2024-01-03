import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import SidebarRight from './Components/SidebarRight/SidebarRight';
import Login from './Components/login/login';
import Registion from './Components/register/Register';
import Navbar from "./Components/navbar/Navbar";
import Home from "./Components/Home/home";
import Job from './Components/job/job';
import Share from './Components/share/share';

function App() {
  return (
    <div className="App"  style={{ backgroundColor: '#ddccb03b'}}>
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<SidebarRight />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registion />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/job" element={<Job />} />
          <Route path="/share" element={<Share />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
