import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import SidebarRight from './Components/SidebarRight/SidebarRight';
import Login from './Components/login/login';
import Registion from './Components/register/Register';
import Navbar from "./Components/navbar/Navbar";
import Home from "./Components/Home/home";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sidebar" element={<SidebarRight />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registion />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
