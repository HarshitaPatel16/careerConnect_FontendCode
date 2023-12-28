
import React from 'react';
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import lightLogo from "../../assets/CareerConnect-black-logo.png";
import avtart from "../../assets/avatar1.png";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
      <div className=" d-flex justify-content-between w-100">
        <div className='col-md-3 d-flex justify-content-center'>
        <a className="navbar-brand" href="#" style={{marginRight:0}}>
          <img  src={lightLogo} alt="" />
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
     
        <div className=" col-md-6 collapse navbar-collapse" id="navbarNav">
           {/* Add the search box */}
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
              <a className="nav-link" href="#">
               <HomeOutlinedIcon style={{ marginRight: '28px' }}/>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <BusinessOutlinedIcon style={{ marginRight: '28px' }}/>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <EmailOutlinedIcon style={{ marginRight: '28px' }} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <NotificationsOutlinedIcon />
              </a>
            </li>
          </ul>

         
        </div>
        <div className=" col-md-2 collapse navbar-collapse justify-content-center" id="navbarNav">
           
          <ul className="navbar-nav ml-auto">
           
          <div className="user">
       <img
   src={avtart}
   alt="sunil"
   className="chat_profile"
 />
         <span>UserName</span>
          
       </div>
            
            
          </ul>

         
        </div>

        {/* <div className="right">
       
       
       <div className="user">
       <img
   src={avtart}
   alt="sunil"
   className="chat_profile"
 />
         <span></span>
          
       </div>

     </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

