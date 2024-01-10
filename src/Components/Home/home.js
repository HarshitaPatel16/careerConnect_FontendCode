import * as React from 'react';
import "./home.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from "../navbar/Navbar";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { image } from "../../assets/8.png";
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { getProfileById, getreadAllPostSum } from "../../store/action/action";
import API_URL from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from 'react';
import IMAGE_PATH from "../../imageService";
import avatar from '../../assets/avatar5.png';
import background from '../../assets/dnAJUB.webp';
import Share from "../share/share";
import Posts from "../posts/Posts";
import { DarkModeContext } from '../context/darkModeContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggle, darkMode } = useContext(DarkModeContext);

  const profileData = useSelector((state) => state.user.readOneUser);

  const [username, setUsername] = useState(""); // Add state to store username
  const [profilePic, setProfileImage] = useState("");
  const [coverPic, setCoverImage] = useState("");

  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };

    dispatch(getProfileById(API_URL, data));
  }, [dispatch]);

  useEffect(() => {
    if (profileData !== null && profileData !== undefined) {
      if (
        profileData.readOneUser !== null &&
        profileData.readOneUser !== undefined
      ) {
        const data = profileData.readOneUser;
        setUsername(data.username);
        setProfileImage(data.profilePic);
        setCoverImage(data.coverPic)
      }
    }
  }, [profileData]);

  const handleProfileClick = () => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    dispatch(getProfileById(API_URL, data));
    navigate('/profile'); // Replace '/profile' with the actual path to your profile page
  };

  const reduxPostssum = useSelector((state) => state.post);
  const [postssum, setPostssum] = useState([]);

  console.log(reduxPostssum, "reduxPostssum");

  useEffect(() => {
    if (reduxPostssum.readAllSumPOST && reduxPostssum.readAllSumPOST.data) {
      const data = reduxPostssum.readAllSumPOST.data;
      setPostssum(data.post_sum);
    }
  }, [reduxPostssum]);
  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    dispatch(getreadAllPostSum(API_URL, data));
  }, [dispatch]);



  console.log("Image path:", IMAGE_PATH + "user/" + (profileData ? profileData.profilePic : avatar));


  return (

    <Box sx={{ flexGrow: 1, justifyContent: 'center', marginTop: '80px' }}>
      <Navbar />
      <Grid container spacing={3} sx={{ display: 'flex', marginTop: '0vh', margin: "0 3vw", width: "91vw" }} >

        {/* myprofile card start */}

        <Grid item xs={12} md={12} lg={3}>
          <div style={{ position: 'sticky', top: 100, zIndex: 1030 }} >

            <Item className={darkMode ? 'dark-card' : 'light-card'}>
              <div  >

                <CardMedia
                  component="img"
                  alt="Cover Image"
                  src={background}
                  className="cover-img1"
                />
                <div className="profile1">
                  <img
                    src={

                      (profileData?.profilePic
                        ? IMAGE_PATH + "user/" + profileData.profilePic
                        : avatar)
                    }
                    alt="Profile"
                    className="profile-photo1"

                  />
                </div>
                <CardContent >
                  <Typography variant="subtitle1" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span className={`${darkMode ? 'username-dark' : 'username-light'}`}>{profileData && profileData.username ? profileData.username : ""}</span>
                  </Typography>

                  <Typography className="d-flex justify-content-center" variant="subtitle1" component="div" sx={{ display: 'flex', padding: '2px', fontSize: "14px" }}>
                    <span > {profileData && profileData.profile_heading ? profileData.profile_heading : ""}</span>
                  </Typography>
                </CardContent>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>

                  <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                    <Typography variant="subtitle1">
                      <span className="counts-css">
                        {reduxPostssum && reduxPostssum.readAllSumPOST && reduxPostssum.readAllSumPOST.post_sum ? reduxPostssum.readAllSumPOST.post_sum : ""}
                      </span><br />
                      Post
                    </Typography>
                  </div>

                  <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                    <Typography variant="subtitle1">
                      <span className="counts-css">0</span><br />
                      Followers
                    </Typography>
                  </div>

                  <div >
                    <Typography variant="subtitle1">
                      <span className="counts-css">0</span><br />
                      Following
                    </Typography>
                  </div>

                </CardContent>
                <CardContent>
                  <div className='p-3'>
                    <button type="button" onClick={handleProfileClick} class="btn btn-primary my-profile">My Profile</button>
                  </div>
                </CardContent>


              </div>
            </Item>
          </div>
        </Grid>
        {/* myprofile card end */}
        <Grid item xs={12} md={12} lg={6}>

          <Share />
          <Posts />
        </Grid>

        <Grid item xs={12} md={12} lg={3}>
          <div style={{ position: 'sticky', top: 100, zIndex: 1030 }} >

            <Item className={`${darkMode ? 'dark-card' : 'light-card'}`}>
              <div className="row">
                <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>

                  <div className='col-md-8'>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginRight: "6em" }}>
                      Activity
                    </Typography>
                    <div className='d-flex'>
                      <div className="profile3 col-md-2 m-0 p-2">
                        <img
                          src="https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp"
                          alt="Profile"
                          className="profile-photo3"
                        />

                      </div>
                      <div className="profile3 col-md-6  p-2">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: "1em" }}>
                          username
                        </Typography>

                      </div>

                    </div>
                    <div className='d-flex'>
                      <div className="profile3 col-md-2 m-0 p-2">
                        <img
                          src="https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp"
                          alt="Profile"
                          className="profile-photo3"
                        />

                      </div>
                      <div className="profile3 col-md-6  p-2">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: "1em" }}>
                          username
                        </Typography>

                      </div>

                    </div>

                  </div>

                  <div className='col-md-4'>
                    <Typography variant="subtitle1" sx={{ fontWeight: '' }}>
                      see all
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "blue" }}>
                      Followers
                    </Typography>

                  </div>
                </CardContent>
              </div>
            </Item>
          </div>
        </Grid>


      </Grid>


    </Box>

  )
}

export default Home