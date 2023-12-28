import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import SidebarRight from "../SidebarRight/SidebarRight";
import "./Profile.css"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Navbar from "../navbar/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import trofe from "../../assets/MicrosoftTeams-image (7).png";
import AddIcon from '@mui/icons-material/Add';
import resumeImg from "../../assets/resumePlaceholder.png"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { CardActions } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));




function Profile() {


  const [value, setValue] = React.useState('1');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [skill, setSkill] = useState("")
  const [experiences, setExperiences] = useState("");
  const addSkillCardRef = useRef(null);
  const addExperienceCardRef = useRef(null);
  const [isCoverEditable, setisCoverEditable] = useState(false);
  const [selectedCoverImage, setselectedCoverImage] = useState(null);
  const [isProfileChangeDialogOpen, setisProfileChangeDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState( 'https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp');
  const videoRef = useRef(null);
  const [profileImg, setProfileImg] = useState([]);
  const [files, setFiles] = useState([]);
  console.log("files", files)
  const [isCameraStarted, setCameraStarted] = useState(false);
  const [resumePdf, setResumePdf] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const fileInputRef = useRef(null);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setResumePdf(file);
      setShowUploadButton(true);
    } else {
      console.error('Invalid file format. Please select a PDF file.');
    }
  };

  const handleChoosePdf = () => {
    // Trigger the file input when the "Choose PDF" button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadResume = () => {
    // Implement logic to upload the resume PDF
    if (resumePdf) {
      console.log('Resume uploaded:', resumePdf);
      // You can send the resumePdf file to your server or perform other actions here
    } else {
      console.error('No resume file selected.');
    }
  };
  const handleDeleteResume = () => {
    setResumePdf(null);
    setShowUploadButton(false);
  };

  const startCamera = async () => {
    setCameraStarted(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setCameraStarted(false);
  };
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const handleCaptureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    const blob = dataURLtoBlob(dataUrl);
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });
    setFiles(files.concat(file));
    setProfileImg(prevImages => [...prevImages, dataUrl]);
    stopCamera();
    // setDialogOpen(true);
  };

  

  const handleProfileImageClick = () => {
    setisProfileChangeDialogOpen(true);
    setProfileImg("")
  };

  const handleCloseProfileDialog = () => {
    setisProfileChangeDialogOpen(false);
    // stopCamera()
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSaveImage = () => {
    setisProfileChangeDialogOpen(false);
  };
  const handleEditClick = () => {
    setisCoverEditable(true);
  };

  const handleCoverImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the file change logic here
    // For example, you can upload the file to a server or process it in some way
    console.log('File changed:', selectedFile);

    // Update the selectedCoverImage state
    setselectedCoverImage(URL.createObjectURL(selectedFile));

    // After handling the file, you can set isCoverEditable back to false
    setisCoverEditable(false);
  };

  // const handleCloseProfileDialog = () => {
  //   setisCoverEditable(false);
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAddSkillToggle = () => {
    setShowAddSkill(!showAddSkill);
  };

  const handleAddExperienceToggle = () => {
    setShowAddExperience(!showAddExperience);
  };

  useEffect(() => {
    if (showAddSkill && addSkillCardRef.current) {
      addSkillCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (showAddExperience && addExperienceCardRef.current) {
      addExperienceCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showAddSkill, showAddExperience]);

  const handleSkill = (e) => {
    setSkill(e.target.value)
  }



  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#ddccb03b', height: "110%", color: "black" }}>
      <Navbar />
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0vh' }}>
        <Grid item xs={12} md={8} lg={8}>
          <Item>
            <div>
              <div className="cover-container">
                <CardMedia
                  component="img"
                  alt="Cover Image"
                  src={selectedCoverImage || "https://cdn.wallpapersafari.com/76/89/dnAJUB.jpg"}
                  className="cover-img justify-content-between"
                />
                <EditSharpIcon className="edit-icon" onClick={handleEditClick} />

                {isCoverEditable && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    style={{ display: 'none' }}
                    ref={(input) => input && input.click()}
                  />
                )}

              </div>

              <div className="profile">
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="profile-photo"
                  onClick={handleProfileImageClick}
                />
            
                <Dialog open={isProfileChangeDialogOpen} onClose={handleCloseProfileDialog}>
                  <DialogContent>
                  <div className="mb-2 ">
                      
                      <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                    />
                      <button className="" onClick={startCamera}>Start Camera</button>
                    </div>

                    {/* {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{ maxWidth: '100%', marginTop: '16px' }}
                      />
                    )} */}
                    
                    {isCameraStarted && <video ref={videoRef} autoPlay />}
                    {!isCameraStarted && (
                      <div>
                        {profileImg && profileImg.map((profileImg, index) => (
                          <img key={index} src={profileImg} alt={`Captured Image ${index}`} />
                        ))}
                      </div>
                    )}
                    <div className="d-flex justify-content-center mt-2">
                    <Button onClick={isCameraStarted ? handleCaptureImage : handleCloseProfileDialog} variant="contained" color="primary">
                      {isCameraStarted ? 'Capture Image' : 'Close'}
                    </Button>
                    <Button onClick={handleSaveImage} variant="contained" color="primary">
                      Save
                    </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
              </div>
              <CardContent>
                <Typography variant="subtitle1" component="div" sx={{ display: 'flex', }}>
                  <span className="fw-bold username "> name</span>
                  {/* <button type="button" className="btn btn-secondary">Edit</button> */}
                </Typography>
                <Typography className="d-flex justify-align-left userinfo" variant="subtitle1" component="div">
                  Designation
                  {/* <button type="button" class="btn btn-secondary">Edit</button> */}
                </Typography>
              </CardContent>


            </div>
          </Item>
          <Card sx={{ marginTop: "10px" }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Skills" value="1" />
                    <Tab label="Experience" value="2" />
                    <Tab label="Resume" value="3" />
                    <Tab label="About" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Card ref={addSkillCardRef} className="p-4">
                    <Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3 text-dark">Skills</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddSkillToggle} /></span>
                      </div>
                      <span className="skill-btn ">HTML</span>
                    </Typography>

                  </Card>

                  {/* Add skills card start */}
                  {showAddSkill && (
                    <Card className="p-4 mt-2">

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 text-dark">Add Skill*</span>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-8">
                          <input type="text" className="form-control" value={skill} onChange={handleSkill} />
                        </div>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>

                    </Card>
                  )}
                  {/* Add skills card end */}
                </TabPanel>
                <TabPanel ref={addExperienceCardRef} value="2">
                  <Card className="p-4">
                    <Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3 text-dark">Experience</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddExperienceToggle} /></span>
                      </div>

                    </Typography>
                    <div className="d-flex justify-content-start">
                      <div className="">
                        <img
                          src="https://st2.depositphotos.com/1065578/7533/i/450/depositphotos_75333451-stock-photo-abstract-geometric-company-logo.jpg"
                          alt="Profile"
                          className="company-logo"
                        />
                      </div>
                      <div className="ms-3">
                        <h6 className="fw-bold mt-2 mb-0 d-flex">Data Engineer</h6>
                        <p className="fw-normal text-secondary mb-0 d-flex">BytesFarms Technologies,</p>
                        <p className="fw-normal text-secondary mb-0 d-flex">June 22, 2022 - July 23, 2023</p>
                        <p className="fw-normal text-secondary mb-0 d-flex">Indore, M.P., India     <ul className="fw-normal text-secondary mb-0">On Site</ul></p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-start">
                      <div className="">
                        <img
                          src="https://st2.depositphotos.com/1065578/7533/i/450/depositphotos_75333451-stock-photo-abstract-geometric-company-logo.jpg"
                          alt="Profile"
                          className="company-logo"
                        />
                      </div>
                      <div className="ms-3">
                        <h6 className="fw-bold mt-2 mb-0 d-flex">Data Engineer</h6>
                        <p className="fw-normal text-secondary mb-0 d-flex">BytesFarms Technologies,</p>
                        <p className="fw-normal text-secondary mb-0 d-flex">June 22, 2022 - July 23, 2023</p>
                        <p className="fw-normal text-secondary mb-0 d-flex">Indore, M.P., India     <ul className="fw-normal text-secondary mb-0">On Site</ul></p>
                      </div>
                    </div>
                    <hr />

                  </Card>
                  {/* Add experiences card start */}
                  {showAddExperience && (
                    <Card className="p-4 mt-2">

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 text-dark">Add Experience</span>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>


                      <div className="box">

                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <select
                              type="text"
                              className="form-select border"
                              placeholder="Title"
                            >
                              <option disabled>Job Title*</option>
                            </select>
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Profile Headline"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Employement Type"
                            />
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border"
                              placeholder="Company Name"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border"
                              placeholder="Location"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Location Type"
                            />
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <input
                              type="date"
                              className="form-control border"
                              placeholder="Start Date"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="Date"
                              className="form-control border"
                              placeholder="End Date"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Industry"
                            />
                          </div>
                          <div><textarea className="col-md-12 mt-3 py-1 " rows={5}></textarea></div>


                        </div>
                      </div>


                    </Card>
                  )}
                  {/* Add experiences card end */}
                </TabPanel>
                <TabPanel value="3">
      {resumePdf ? (
        <div>
          {/* Display the embedded PDF or use a PDF viewer here */}
          <embed
            src={URL.createObjectURL(resumePdf)}
            title="Embedded PDF"
            width="100%"
            height="500px"
          ></embed>
          <button className="btn btn-danger" onClick={handleDeleteResume}>
            <DeleteOutlineIcon /> Delete
          </button>
           <button className="btn btn-primary" onClick={handleUploadResume}>
              <UploadFileIcon /> Upload Resume
            </button>
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
            
          <button className="btn btn-success" onClick={handleChoosePdf}>
            <UploadFileIcon /> Choose PDF
          </button>
        </div>
      )}
    </TabPanel>
              </TabContext>
            </Box>
          </Card>

        </Grid>


        <Grid item xs={12} md={4} lg={3} >
          <Item>
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
        </Grid>
      </Grid>

    </Box>


  );
}

export default Profile;
