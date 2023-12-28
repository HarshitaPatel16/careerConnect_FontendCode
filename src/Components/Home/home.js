import * as React from 'react';
import "./home.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from "../navbar/Navbar";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import {image} from "../../assets/8.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Home = () => {
  return (
   
     <Box sx={{ flexGrow: 1, backgroundColor: '#ddccb03b', height: "100vh", color: "black",  justifyContent: 'center',}}>
        <Navbar />
      <Grid container spacing={3} sx={{ display: 'flex', marginTop: '0vh', margin:"0 3vw", width:"91vw"}}>

    {/* myprofile card start */}

        <Grid item xs={3}>
          <Item>
        <div>

        <CardMedia
  component="img"
  alt="Cover Image"
  image="https://cdn.wallpapersafari.com/76/89/dnAJUB.jpg"
  className="cover-img1"
/>
<div className="profile1">
  <img
    src="https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp"
    alt="Profile"
    className="profile-photo1"

  />
</div>
<CardContent>
                <Typography variant="subtitle1" component="div" sx={{ display: 'flex', }}>
                  <span className="fw-bold username1 "> name</span>
                </Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>

    <div>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        <span>200</span><br/>
        Post
      </Typography>
    </div>

    <div>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
      <span>200</span><br/>
        Followers
      </Typography>
    </div>

    <div>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
      <span>200</span><br/>
        Following
      </Typography>
    </div>
  </CardContent>
  <CardContent>
  <button type="button" class="btn btn-primary btn-lg rounded">My Profile</button>
              </CardContent>

</div>
          </Item>
        </Grid>
        {/* myprofile card end */}
        <Grid item xs={6}>
          <Item>
          <div className="row">
        <div className="profile2 col-md-2 m-0 p-0">
          <img
            src="https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp"
            alt="Profile"
            className="profile-photo2"
          />
        </div>
        <div className="input-container col-md-8 p-1">
          <input type="text" placeholder="Enter something" className="form-control" />
        </div>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>

    <div>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Image
      </Typography>
    </div>

    <div>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Video
      </Typography>
    </div>
  </CardContent>
      </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>3rd</Item>
        </Grid>
      </Grid>
    </Box>
   
  )
}

export default Home