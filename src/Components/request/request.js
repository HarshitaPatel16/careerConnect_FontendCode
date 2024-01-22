import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from "../navbar/Navbar";
import avatar from '../../assets/avatar5.png';
import background from '../../assets/dnAJUB.webp';
import Typography from "@mui/material/Typography";
import "./request.css";
import { Card, CardContent, CardMedia} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DarkModeContext } from '../context/darkModeContext';
import { useEffect, useContext } from 'react';
import axios from "axios";
import API_URL from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { addCreateResquests } from "../../store/action/action";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', "Technical Lead 13+ yrs | NodeJS | Angular | iOS | Android | Php | MVC | JS | JQuery |"),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData2(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const cards = [
    createData2('Frozen yoghurt', "Technical Lead 13+ yrs Reacjs", avatar),
    createData2('Ice cream sandwich', "Technical Lead 13+ yrs Java",avatar),
    createData2('Eclair', "Technical Lead 13+ yrs Node", avatar),
    createData2('Cupcake', "Technical Lead 13+ yrs Js", avatar),
    createData2('Gingerbread', "Technical Lead 13+ yrs", avatar),
  ];



export default function BasicTable() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userIdTo, setuserIdTo] = useState("")

  

  function handleAddRequest() {
    const formData = new FormData();
    formData.append("user_id_From", localStorage.getItem("user_id"));
    formData.append("user_id_To", userIdTo);
    dispatch(addCreateResquests(API_URL, formData));
  }


  const { toggle, darkMode } = useContext(DarkModeContext);


    const [showAll, setShowAll] = React.useState(false);
    const visibleRows = showAll ? rows : rows.slice(0, 3);

    const handleSeeAllClick = () => {
        setShowAll(!showAll);
      };
  
  return (

<Box sx={{ flexGrow: 1, justifyContent: 'center', marginTop: '80px' }}>
      <Navbar />

    
        <Grid container spacing={3} className='mt-3' style={{width:"99.5vw", marginLeft: "1px"}}>
<div className='d-flex justify-content-center col-md-12 mt-4'>
<Grid item xs={12} md={4} lg={10} className={darkMode ? 'dark-card' : 'light-card'}>
            <Item className={darkMode ? 'dark-card' : 'light-card'}>
        <TableContainer component={Paper} className={darkMode ? 'dark-card' : 'light-card'}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell variant="h6" component="div" style={{fontSize:".9vw",fontWeight:"550"}}>Invitations</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right" variant="h6" component="div" style={{fontSize:".9vw",fontWeight:"550"}}>
                    <span onClick={handleSeeAllClick}>{showAll ? 'See Less' : 'See All'}</span>
                  </TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
                {visibleRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.calories ? (
                        <Typography align="left">{row.name}</Typography>
                      ) : (
                        <img src={row.name} alt={row.name} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Typography align="left">{row.name}</Typography>
                      <Typography align="left">{row.calories}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <button class="btn btn-outline-secondary">Ignore</button>
                    </TableCell>
                    <TableCell align="right">
                      <button class="btn btn-primary">Accept</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      </TableContainer>
      </Item>
     
        </Grid>
</div>

        </Grid>

   
             <div className='d-flex justify-content-center'>
             <Grid item xs={12} sm={ 12} md={12} lg={12} style={{margin:"1vw",padding:"1vw",borderRadius:"0.5vw", width:"83vw", backgroundColor: "#fff"}} className={darkMode ? 'dark-card' : 'light-card'}>
              
              <div className=' '>
                 <div className='mt-3 mb-2 d-flex flex-wrap justify-content-between'><div><p style={{fontSize:"1.6vw",fontWeight:"600",marginLeft:"1vw"}}>People you may know</p></div>
                
               </div>  
                         <div className='mt-2  d-flex flex-wrap justify-content-start'>
                            
                             {cards.map((e,index) => (
                                 <Card  key={index}  sx={{border:'1px solid #ced4da', borderRadius: '0.6em', width:280,boxShadow:" rgba(0, 0, 0, 0.01) 0px 3px 5px",marginBottom: 8, marginRight: 2,marginLeft:2, transition: 'transform 0.3s','&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 18px rgba(0, 0, 0, 0.1)',cursor:"pointer"} }} className={darkMode ? 'dark-card' : 'light-card'}>
                                  <CardMedia
              component="img"
              alt="Cover Image"
              src={background}
              className="cover-img1"
            />
            <CardContent>
            <div className="profilecard121">
              <img
                src={avatar}
                alt="Profile"
                className="profile-photocard121"
              />
            </div>
            </CardContent>
             
                                 <CardContent>
                                    
                                     <Typography  variant="h6" component="div" style={{fontSize:".9vw",fontWeight:"550"}}>
                                  
                                     {e.name}
                              
                                     </Typography>
                                     <Typography variant="h6" component="div" style={{fontSize:".9vw",fontWeight:"550"}}>
                                     {e.calories}
                                     </Typography>
                                     <Typography variant="body2" color="text.secondary">
                                  {/* <span style={{color:"black",fontWeight:"600"}}>   ₹{e.price}</span> onwards */}
                                     </Typography>
                                 </CardContent>
                                 <CardContent>
              <div className='p-3'>
                <button onClick={{handleAddRequest}}className="btn btn-primary">Content</button>
              </div>
            </CardContent>
                                 </Card>
                             ))}

                         </div>
                 </div>
         </Grid>
             </div>

     

       
      
       


    </Box>
  );
}
