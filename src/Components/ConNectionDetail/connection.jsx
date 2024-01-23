import React, { useState, useRef, useEffect, useContext } from "react";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./../Profile/Profile.css"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "../navbar/Navbar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import trofe from "../../assets/MicrosoftTeams-image (7).png";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import API_URL from "../../service";
import { getUsersById } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import IMAGE_PATH from "../../imageService";
import { useNavigate } from "react-router-dom";
import avatar from '../../assets/avatar5.png';
import resumeImg  from "../../assets/resume.png"
import { useParams } from "react-router-dom";
import expImg from "../../assets/experience.png"
import Avatar from '@mui/material/Avatar';
import ActivityPosts from "../Activity/activitypost/ActivityPosts";
import { DarkModeContext } from "../context/darkModeContext";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));




function ConnectionDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user_id } = useParams();
    const { toggle, darkMode } = useContext(DarkModeContext);


    const [value, setValue] = React.useState('1');
    const addSkillCardRef = useRef(null);
    const addExperienceCardRef = useRef(null);

    const userData = useSelector((state) => state.user.readOneUserAllData);
console.log(userData, "UserData");
    const [userName, setUserName] = useState(""); // Add state to store username
    const [profilePic, setProfilePic] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [coverPic, setCoverImage] = useState("");
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState("");
    const [about, setAbout] = useState("");
    const [skills, setSkills] = useState([]);
    const [profileHeading, setprofileHeading] = useState("");
    const [startYear, setstartYear] = useState("");
    const [endYear, setendYear] = useState("");
    const [description, setdescription] = useState("");
    const [employeType, setemployeType] = useState("");
    const [location, setlocation] = useState("");
    const [locationType, setlocationType] = useState("");
    const [jobTitle, setjobTitle] = useState("");

    const handleDownloadPdf = () => {
        if (userData && userData.resume) {
          const pdfUrl = `${IMAGE_PATH}user/${userData.resume}`;
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.target = '_blank';
          link.download = 'resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('No resume available for download.');
        }
      };

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(() => {
        if (userData !== null && userData !== undefined) {
          if (
            userData.readOneUserAllData !== null &&
            userData.readOneUserAllData !== undefined
          ) {
            const data = userData.readOneUserAllData;
            console.log('Profile data:', data); // Check if this log shows the expected data
    
            setUserName(data.userName);
            setProfilePic(data.profilePic);
            setCoverImage(data.coverPic)
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setMobile(data.mobile);
            setAddress(data.address);
            setResume(data.resume);
            setAbout(data.about);
            setprofileHeading(data.profileHeading);
            console.log('After setting state:', {
              userName: data.userName,
              mobile: data.mobile,
              address: data.address,
              // Add other fields as needed
            });
          }
        }
      }, [userData]);

      useEffect(() => {
        // Fetch user details using the user_id from route params
        dispatch(getUsersById(API_URL, { user_id }));
      }, [dispatch, user_id]);

    return (
        <Box sx={{ flexGrow: 1, marginTop: '80px' }}>
            <Navbar />
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0vh' }}>
                <Grid item xs={12} md={8} lg={8}>
                    <Item className={`${darkMode ? 'dark-card' : 'light-card'}`}>
                        <div>
                            <div className="cover-container">
                            <CardMedia
                  component="img"
                  alt="Cover Image"
                  src={(userData?.coverPic
                    ? IMAGE_PATH + "user/" + userData.coverPic
                    : "https://cdn.wallpapersafari.com/76/89/dnAJUB.jpg")}
                  className="cover-img justify-content-between"
                />
                            </div>

                            <div className="profile">
                                <img

src={
    
    (userData?.profilePic
      ? IMAGE_PATH + "user/" + userData.profilePic
      : avatar)
  }
                                    alt="Profile"
                                    className="profile-photo"
                                />
                            </div>
                            <CardContent>
                                <Typography variant="subtitle1" component="div" className="d-flex align-items-center justify-content-between">
                                <span className="fw-bold username "> {userData && userData.username ? userData.username : ""}</span>

                                </Typography>
                                <Typography className=" col-md-8 userinfo" variant="subtitle1" component="div">
                  {userData && userData.profile_heading ? userData.profile_heading : "Default Heading"}
                </Typography>
                            </CardContent>


                        </div>
                    </Item>
                    <Card className={`${darkMode ? 'dark-card' : 'light-card'}`} sx={{ marginTop: "10px" }}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Skills" value="1" />
                                        <Tab label="Experience" value="2" />
                                        <Tab label="Resume" value="3" />
                                        <Tab label="Education" value="4" />
                                        <Tab label="Activity" value="5" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Card ref={addSkillCardRef} className="p-4">
                                        <Typography variant="subtitle1" component="div">
                                            <div className="d-flex justify-content-between">
                                                <span className="fs-3 text-dark">Skills</span>
                                            </div >
                                            <div>
            {userData && userData.skills ? (
                userData.skills.map((skill, index) => (
                    <React.Fragment key={skill.skills_id}>
                        <div className="d-flex align-items-center justify-content-between">
                            <span style={{ marginRight: '10px' }}>{skill.skils_name}</span>
                        </div>
                        {index < userData.skills.length - 1 && <hr />}
                    </React.Fragment>
                ))
            ) : (
                <p>No skills available.</p>
            )}
        </div>


                                        </Typography>

                                    </Card>


                                </TabPanel>
                                <TabPanel ref={addExperienceCardRef} value="2">
                                    <Card className="p-4">
                                        <Typography variant="subtitle1" component="div">
                                            <div className="d-flex justify-content-between">
                                                <span className="fs-3 text-dark">Experience</span>
                                            </div>
                                        </Typography>
                                        {userData && userData.experience  ? (
                      <div className="d-flex justify-content-between">
                        <div className="col-md-12">
                          {userData.experience  &&
                           userData.experience .map((experience) => (
                              <div>
                                <div key={experience.experience_id} className="d-flex align-items-center ms-3 justify-content-between ">
                                  {/* Map the Avatar for each experience */}
                                  <div className="col-md-1">
                                    <Avatar>{experience.company.charAt(0).toUpperCase()}</Avatar>
                                  </div>
                                  <div className="col-md-10 ">
                                    <h6 className="fw-bold mt-2 mb-0 d-flex">
                                      {experience.job_title}{' '}
                                    </h6>
                                    <p className="fw-normal mb-0 d-flex">{experience.company},</p>
                                    <p className="fw-normal  mb-0 d-flex">
                                      {new Date(experience.start_year).toLocaleDateString()} - {new Date(experience.end_year).toLocaleDateString()}
                                    </p>
                                    <p className="fw-normal mb-0 d-flex">
                                      {experience.location}, {experience.location_type === 1 ? (
                                        <span>On Site</span>
                                      ) : experience.location_type === 2 ? (
                                        <span>Hybrid</span>
                                      ) : experience.location_type === 3 ? (
                                        <span>Remote</span>
                                      ) : null}{' '}
                                      {experience.employe_type === 1 ? (
                                        <span>Full Time</span>
                                      ) : experience.employe_type === 2 ? (
                                        <span>Self-Employeed</span>
                                      ) : experience.employe_type === 3 ? (
                                        <span>Freelance</span>
                                      ) : experience.employe_type === 4 ? (
                                        <span>Trainee</span>
                                      ) : null}

                                    </p>
                                  </div>
                                  
                                  <hr />
                                </div>
                                <hr />
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <img src={expImg} alt="Profile" className="trofie mt-2" />
                        </div>
                        
                      </div>

                    )}

                                    </Card>
                                </TabPanel>
                                <TabPanel value="3">
                                    {/* {Resume ? ( */}
                                        <div>
                                            <img
                                                src= {resumeImg}
                                                alt="Profile"
                                                className="trofie"

                                            />
                                        </div>
                                    {/* ) : ( */}
                                        <div>
                                            {/* <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleResumeChange}
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                            /> */}
                                            <div>
                                                <div>
                                                    <iframe
                                                        title="Resume PDF"
                                                        src={`${IMAGE_PATH}user/${userData ? userData.resume : ""}#toolbar=0`}
                                                        width="100%"
                                                        height="600px"
                                                    ></iframe>


                                                </div>
                                                <button className="btn btn-success mx-2" onClick={handleDownloadPdf}>
                                                    <FileDownloadIcon /> Download PDF
                                                </button>
                                            </div>

                                        </div>
                                    {/* )} */}
                                </TabPanel>
                                <TabPanel value="4">
                                <Card className="p-4">
                                        <Typography variant="subtitle1" component="div">
                                            <div className="d-flex justify-content-between">
                                                <span className="fs-3 text-dark">Education</span>
                                            </div>
                                        </Typography>
                                        {userData && userData.educations ? (
                      <div className="d-flex justify-content-between">
                        <div className="col-md-12">
                          {userData.educations &&
                            userData.educations.map((experience) => (
                              <div>
                                <div key={experience.education_id} className="d-flex align-items-center ms-3 justify-content-between ">
                                  {/* Map the Avatar for each experience */}
                                  <div className="col-md-1">
                                    <Avatar>{experience.institution_name}</Avatar>
                                  </div>
                                  <div className="col-md-10 ">
                                  <h6 className="fw-bold mt-2 mb-0 d-flex">
                                      {experience.institution_name}
                                    </h6>
                                    <h6 className="fw-normal mb-0 d-flex">
                                      {experience.degree} {experience.field_of_study}
                                    </h6>
                                    {/* <p className="fw-normal mb-0 d-flex">{experience.field_of_study},</p> */}
                                    <p className="fw-normal mb-0 d-flex">{experience.activities},</p>

                                    <p className="fw-normal  mb-0 d-flex">
                                      {new Date(experience.start_year).toLocaleDateString()} - {new Date(experience.end_year).toLocaleDateString()}
                                    </p>
                                   
                                  </div>
                                  
                                  <hr/>
                                </div>
                                <hr/>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <img src={expImg} alt="Profile" className="trofie mt-2" />
                        </div>
                       
                      </div>

                    )}

                                    </Card>
                                </TabPanel>
                                <TabPanel value="5">
                                <ActivityPosts userData={userData} />


                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Card>

                </Grid>
                <Grid item xs={12} md={4} lg={3} >
                <div style={{ position: 'sticky', top: 100, zIndex: 1030 }} >

                    <Item className={` ${darkMode ? 'dark-card' : 'light-card'}`}>
                        <div>

                            <div className="trofie">
                                <img
                                    src={trofe}
                                    alt="Profile"
                                    className="trofie"

                                />


                            </div>
                            <CardContent>
                                <Typography variant="subtitle1" component="div">
                                    Upgrade to Pro
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                                </Typography>


                            </CardContent>


                        </div>
                    </Item>
                    </div>
                </Grid>
               

            </Grid>

        </Box>
    );
}

export default ConnectionDetail;
