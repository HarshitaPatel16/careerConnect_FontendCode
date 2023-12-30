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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import API_URL from "../../service";
import { addCreateSkills, updateProfile } from "../../store/action/action";
import { getProfileById, getSkilsById } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import IMAGE_PATH from "../../imageService";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));




function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState('1');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [skill, setSkill] = useState("")
  const [userId, setUserId] = useState("")
  const [experiences, setExperiences] = useState("");
  const addSkillCardRef = useRef(null);
  const addExperienceCardRef = useRef(null);
  const [isCoverEditable, setisCoverEditable] = useState(false);
  const [selectedCoverImage, setselectedCoverImage] = useState(null);
  const [isProfileChangeDialogOpen, setisProfileChangeDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('https://pics.craiyon.com/2023-05-30/eaab7f873e324b3e8f41f5aba2c2aeb2.webp');
  const videoRef = useRef(null);
  const [profileImg, setProfileImg] = useState([]);
  const [files, setFiles] = useState([]);
  console.log("files", files)
  const [isCameraStarted, setCameraStarted] = useState(false);
  const [resumePdf, setResumePdf] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const fileInputRef = useRef(null);


  const profileData = useSelector((state) => state.user.readOneUser);
  const skillsData = useSelector((state) => state.user.readOneSkills);


  const [userName, setUserName] = useState(""); // Add state to store username
  const [profilePic, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [coverPic, setCoverImage] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };

    dispatch(getProfileById(API_URL, data));
  }, [dispatch]);
  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };

    dispatch(getSkilsById(API_URL, data));
  }, [dispatch]);

  const [isDialogOpen, setDialogOpen] = React.useState(false);

  // Function to open the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  function handleUpate() {

    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("mobile", mobile);
    formData.append("profilePic", profilePic);
    formData.append("coverPic", coverPic);
    formData.append("address", address);
    // formData.append("resume", resume);
    formData.append("about", about);
    if (resumePdf) {
      formData.append("resume", resumePdf);
    }

    dispatch(updateProfile(API_URL, formData));
  }

  useEffect(() => {
    if (profileData !== null && profileData !== undefined) {
      if (
        profileData.readOneUser !== null &&
        profileData.readOneUser !== undefined
      ) {
        const data = profileData.readOneUser;
        setUserName(data.userName);
        setProfileImage(data.profilePic);
        setCoverImage(data.coverPic)
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setMobile(data.mobile);
        setAddress(data.address);
        setResume(data.resume);
        setAbout(data.about);

      }
    }
  }, [profileData]);

  useEffect(() => {
    // if (skillsData !== null && skillsData !== undefined) {
    //   if (
    //     skillsData.readOneSkills !== null &&
    //     skillsData.readOneSkills !== undefined
    //   ) {
    //     const data = skillsData.readOneSkills;
    //     setSkills(data.skils_name);
    //   }
    // }
    if (skillsData && Array.isArray(skillsData)) {
      setSkills(skillsData);
    }

  }, [skillsData]);

  function handleAddSkills() {

    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("skils_name", skill);
    setShowAddSkill(false);
    setSkill('');

    dispatch(addCreateSkills(API_URL, formData));
  }

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
      handleUpate(); 
      console.log('Resume uploaded:', resumePdf);
      // You can send the resumePdf file to your server or perform other actions here
    } else {
      console.error('No resume file selected.');
    }
  };
  const handleDeleteResume = () => {
    setResumePdf(null);
    setShowUploadButton(false);
    handleUpate(); 
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
                      <CameraAltOutlinedIcon onClick={startCamera} className="mx-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileUpload}
                      />

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
                    <div className="d-flex justify-content-center mt-2 mx-2">
                      <button className={isCameraStarted ? "btn btn-primary mx-2" : "btn btn-secondary mx-2"} onClick={isCameraStarted ? handleCaptureImage : handleCloseProfileDialog}>                        {isCameraStarted ? 'Capture Image' : 'Close'}
                      </button>
                      <button onClick={handleSaveImage} className="btn btn-success mx-2">
                        Save
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>

              </div>
              <CardContent>
                <Typography variant="subtitle1" component="div" sx={{ display: 'flex', }}>
                  <span className="fw-bold username "> {profileData && profileData.username ? profileData.username : ""}</span>
                  <EditOutlinedIcon onClick={handleOpenDialog} />
                  {/* <button type="button" className="btn btn-se">Edit</button> */}
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
                      {skills.map((skill) => (
          <span key={skill.skills_id} className="skill-btn">
            {skill.skils_name}
          </span>
        ))}
                      {/* <span className="skill-btn ">html</span> */}
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
                          <button type="button" className="btn btn-primary" onClick={handleAddSkills}>
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

                        <div className="row   col">
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Job Title*</label>
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Ex: Full Stack Developer"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Profile Headline*</label>
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="It will appear below your profile"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Employement Type*</label>
                            <select
                              type="text"
                              className="form-select border"
                              placeholder="Title"
                            >
                              <option disabled>Please Select</option>
                              <option>Full Time</option>
                              <option>Self-Employeed</option>
                              <option>Freelance</option>
                              <option>Internship</option>
                              <option>Trainee</option>
                            </select>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Company Name*</label>
                            <input
                              type="text"
                              className="form-control border"
                              placeholder="Ex: BytesFarms Technologies"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Location*</label>
                            <select
                              type="text"
                              className="form-select border"
                              placeholder="Title"
                            >
                              <option disabled>Please Select</option>
                              <option>On-Site</option>
                              <option>Hybrid</option>
                              <option>Remote</option>
                            </select>
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Location Type*</label>

                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Location Type"
                            />
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Start Date*</label>
                            <input
                              type="date"
                              className="form-control border"
                              placeholder="Start Date"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">End Date*</label>
                            <input
                              type="Date"
                              className="form-control border"
                              placeholder="End Date"
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Industry*</label>
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Industry"
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <label className="d-flex justify-content-left ">Description*</label>
                            <textarea className="col-md-12 mt-3 py-1 " rows={5}></textarea>
                          </div>


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

                      <iframe
                        src={`${URL.createObjectURL(resumePdf)}#toolbar=0`}
                        title="Embedded PDF"
                        width="100%"
                        height="1000vh"
                      ></iframe>


                      <button className="btn btn-danger mx-2" onClick={handleDeleteResume}>
                        <DeleteOutlineIcon /> Delete
                      </button>
                      <button className="btn btn-primary mx-2" onClick={handleUploadResume}>
                        <FileUploadIcon /> Upload Resume
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
                      <div>
                        <button className="btn btn-primary mx-2" onClick={handleChoosePdf}>
                          <FileUploadIcon /> Choose PDF
                        </button>
                        <button className="btn btn-success mx-2" onClick={handleChoosePdf}>
                          <FileDownloadIcon /> Download PDF
                        </button>
                      </div>

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
        {/* profile edit diagol box code start*/}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}
          maxWidth="lg" fontwidth
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>

            <div className="modal-body row pt-0 grid gap-0 ">
            <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">First Name <span className='text-danger'>*</span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input type='number' className="form-control" placeholder="Enter First Name" aria-describedby="basic-addon2" required name="amount" value={firstName} />
                </div>
              </div>
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Last Name<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter Last Name" aria-describedby="basic-addon2" required name="amountChangeNote" value={lastName} />
                </div>
                </div> 
            
                <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Contact Number<span className='text-danger'>*</span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input type='number' className="form-control" placeholder="Enter Contact Number" aria-describedby="basic-addon2" required name="amount" value={mobile} />
                </div>
              </div>
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Address<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter Address" aria-describedby="basic-addon2" required name="amountChangeNote" value={address} />
                </div>
                </div>
                </div>
           

          </DialogContent>
          <DialogActions className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleCloseDialog}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCloseDialog}>Save </button>
          </DialogActions>
        </Dialog>
        {/* profile edit diagol box code end*/}

      </Grid>

    </Box>


  );
}

export default Profile;
