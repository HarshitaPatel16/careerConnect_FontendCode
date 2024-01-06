import React, { useState, useEffect, useContext } from 'react';
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import lightLogo from "../../assets/CareerConnect-black-logo.png";
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
// import JobIcon from "../../assets/colored/ic-job.png"

//const Navbar = () => {
   const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [DarkMode, setDarkMode] = useState('');

  const { toggle, darkMode } = useContext(DarkModeContext);


  const handleHomeClick = () => {
    // Navigate to the home page
    navigate('/');
  };

  const handleJobClick = () => {
    // Navigate to the job page
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
      setDarkMode(data.DarkMode);  // Assuming the user data contains the dark mode preference
    }
  }, [profileData]);

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} p-0 fixed-top`}>
      <div className="d-flex justify-content-between w-100 col-md-12">
        <div className='col-md-3 d-flex justify-content-center'>
          <a className="navbar-brand" href="#" style={{ marginRight: 0 }} onClick={handleHomeClick}>
            <img src={lightLogo} alt="" />
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
                {/* <HomeOutlinedIcon style={{ marginRight: '28px' }} /> */}
                <img src={HomeIcon} alt="Home"  />

              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleJobClick}>
                {/* <BusinessOutlinedIcon style={{ marginRight: '28px' }} /> */}
                <img src={JobIcon} alt="Job"  />
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#">
              <img src={NotificationIcon} alt="Home"  />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" >
                {darkMode ? (
                  <WbSunnyOutlinedIcon onClick={toggle} />
                ) : (
                  <DarkModeOutlinedIcon onClick={toggle} />
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
              <span>{profileData && profileData.username}</span>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
