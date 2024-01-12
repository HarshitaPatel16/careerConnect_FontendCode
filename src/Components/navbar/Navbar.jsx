import React, { useState, useEffect, useContext } from 'react';
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import lightLogo from "../../assets/CareerConnect-black-logo.png";
import darklogo from "../../assets/CareerConnect-white-logo.png"
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useNavigate } from 'react-router-dom';
import { getProfileById } from "../../store/action/action";
import API_URL from "../../service";
import { useDispatch, useSelector } from "react-redux";
import IMAGE_PATH from "../../imageService";
import avatar from '../../assets/avatar5.png';
import { DarkModeContext } from "../context/darkModeContext";
import HomeIcon from "../../assets/colored/ic-home.png"
import JobIcon from "../../assets/colored/ic-job.png"
import NotificationIcon from "../../assets/colored/ic-notification.png"
import MoonIcon from "../../assets/colored/moon.png"
import SunIcon from "../../assets/colored/sun.png"
import ConnectIcon from "../../assets/ic-connections.png"

//const Navbar = () => {
   const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toggle, darkMode } = useContext(DarkModeContext);


  const handleHomeClick = () => {
    navigate('/');
  };

  const handleJobClick = () => {
    navigate('/job');
  };

  const profileData = useSelector((state) => state.user.readOneUser);

  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    dispatch(getProfileById(API_URL, data));
  }, [dispatch]);

  useEffect(() => {
    if (profileData && profileData.readOneUser) {
      const data = profileData.readOneUser;
    }
  }, [profileData]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark' : 'navbar-light'} p-0 fixed-top`}>
      <div className="d-flex justify-content-between w-100 col-md-12">
        <div className='col-md-3 d-flex justify-content-center'>
          <a className="navbar-brand" href="#" style={{ marginRight: 0 }} onClick={handleHomeClick}>
          {darkMode ? <img src={darklogo} alt="" /> : <img src={lightLogo} />}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="col-md-6 collapse navbar-collapse" id="navbarNav">
          <form className="form-inline my-2 my-lg-0 ml-auto col-md-4" style={{ marginRight: '28px' }}>
            <input
              className="form-control search mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav ml-auto col-md-2">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleHomeClick}>
                <img src={HomeIcon} alt="Home" style={{ marginRight: '32px' }} className="navbar-icon" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleHomeClick}>
                <img src={ConnectIcon} alt="Home" style={{ marginRight: '32px' }} className="navbar-icon" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleJobClick}>
                <img src={JobIcon} alt="Job" style={{ marginRight: '32px' }} className="navbar-icon" />
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#">
              <img src={NotificationIcon} alt="Home" style={{ marginRight: '32px' }} className="navbar-icon"  />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" >
                {darkMode ? (
                  <img src={SunIcon} onClick={toggle} style={{ marginRight: '32px' }} className="navbar-icon"/>
                ) : (
                  <img src={MoonIcon} onClick={toggle} style={{ marginRight: '32px' }}  className="navbar-icon"/>
                )}
              </a>
            </li>

          </ul>
        </div>

        <div className="col-md-3 collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <div className="user">
              <img
                src={profileData?.profilePic ? IMAGE_PATH + "user/" + profileData.profilePic : avatar}
                className="chat_profile"
              />
              <span className={`${darkMode? "text-light" : "text-dark"}`}>{profileData && profileData.username}</span>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
