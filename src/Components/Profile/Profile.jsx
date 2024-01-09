import React, { useState, useRef, useEffect, useContext } from "react";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import SidebarRight from "../SidebarRight/SidebarRight";
import Avatar from '@mui/material/Avatar';
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
import { addCreateSkills, updateProfile, addCreateExperience } from "../../store/action/action";
import { getProfileById, getSkilsById, getExperienceById, deleteSkills, deleteExperience } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import IMAGE_PATH from "../../imageService";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import avatar from '../../assets/avatar5.png';
import Education from "./Education";
import skillImg from "../../assets/Skills.png"
import expImg from "../../assets/experience.png"
import resumeImg from "../../assets/resume.png"
import { DarkModeContext } from "../context/darkModeContext";

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
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [value, setValue] = React.useState('1');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showEditSkill, setShowEditSkill] = useState(false)
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [skill, setSkill] = useState("")
  const [skillError, setSkillError] = useState("")
  const [userId, setUserId] = useState("")
  const [experiences, setExperiences] = useState("");
  const addSkillCardRef = useRef(null);
  const addExperienceCardRef = useRef(null);
  const [isCoverEditable, setisCoverEditable] = useState(false);
  const [selectedCoverImage, setselectedCoverImage] = useState(null);
  const [isProfileChangeDialogOpen, setisProfileChangeDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const videoRef = useRef(null);
  const [profileImg, setProfileImg] = useState([]);
  const [files, setFiles] = useState([]);
  console.log("files", files)
  const [isCameraStarted, setCameraStarted] = useState(false);
  const [resumePdf, setResumePdf] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const fileInputRef = useRef(null);


  const profileData = useSelector((state) => state.user.readOneUser);
  console.log(profileData, "profileData");
  const skillsData = useSelector((state) => state.user.readOneSkills);
  const experienceData = useSelector((state) => state.user.readOneExperience);
  console.log(experienceData, "experienceData");

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
  const [companyName, setcompanyName] = useState("");
  const [profileHeading, setprofileHeading] = useState("");
  const [startYear, setstartYear] = useState("");
  const [endYear, setendYear] = useState("");
  const [description, setdescription] = useState("");
  const [employeType, setemployeType] = useState("");
  const [location, setlocation] = useState("");
  const [locationType, setlocationType] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [errors, setErrors] = useState({});


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
  useEffect(() => {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };

    dispatch(getExperienceById(API_URL, data));
  }, [dispatch]);


  const handeldeleteSkills = (id) => {
    const data = {
      skills_id: id,
      user_id: localStorage.getItem("user_id"),
    };
    dispatch(deleteSkills(API_URL, data));
  };

  const handeldeleteExperience = (id) => {
    const data = {
      experience_id: id,
      user_id: localStorage.getItem("user_id"),
    };
    console.log(data, "--console.log(data);");
    dispatch(deleteExperience(API_URL, data));
  };
  const [id, setId] = useState(null);
  const [idedit, setIdedit] = useState(null);


  const [isDialogOpen, setDialogOpen] = React.useState(false);

  // Function to open the dialog
  const handleOpenDialog = (item) => {
    setDialogOpen(true);
    setUserName(profileData?.username || '');
    setFirstName(profileData?.first_name || '');
    setLastName(profileData?.last_name || '');
    setMobile(profileData?.mobile || '');
    setAddress(profileData?.address || '');
    setEmail(profileData?.email || '');
    setprofileHeading(profileData?.profile_heading || '');
  };


  // Function to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };



  function handleUpate() {

    const formData = new FormData();
    console.log("FormData values before appending:", formData);

    formData.append("user_id", localStorage.getItem("user_id"));
    console.log("user_id:", userId);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("mobile", mobile);
    formData.append("profile_heading", profileHeading);
    formData.append("coverPic", coverPic);
    formData.append("address", address);
    formData.append("about", about);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    if (resumePdf) {
      formData.append("resume", resumePdf);
    }
    console.log("FormData values after appending:", formData);

    if (
      firstName ||
      lastName ||
      email ||
      mobile ||
      coverPic ||
      address ||
      about ||
      profilePic ||
      resumePdf
    ) {
      dispatch(updateProfile(API_URL, formData));
      handleCloseDialog()
    } else {
      console.log("No fields are being updated");
    }
    // dispatch(updateProfile(API_URL, formData));

  }

  useEffect(() => {
    if (profileData !== null && profileData !== undefined) {
      if (
        profileData.readOneUser !== null &&
        profileData.readOneUser !== undefined
      ) {
        const data = profileData.readOneUser;
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
  }, [profileData]);
  const [skillsId, setSkillsId] = useState(null);

  useEffect(() => {
    if (skillsData && Array.isArray(skillsData)) {
      setSkills(skillsData);
      const firstSkill = skillsData[0];
      if (firstSkill && firstSkill.skills_id) {
        setSkillsId(firstSkill.skills_id);
        localStorage.setItem('skills_id', firstSkill.skills_id);
        localStorage.setItem('user_id', firstSkill.user_id);

      }
    }

  }, [skillsData]);

  function handleAddSkills() {

    if (!skill.trim()) {
      setSkillError('Skill is required.');
      return;
    }
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("skils_name", skill);
    setShowAddSkill(false);
    setSkill('');
    setSkillError("")
    dispatch(addCreateSkills(API_URL, formData));
  }

  // function handleAddExperience() {

  //   const formData = new FormData();
  //   formData.append("user_id", localStorage.getItem("user_id"));
  //   formData.append("company", companyName);
  //   // formData.append("profile_heading", profileHeading);
  //   formData.append("start_year", startYear);
  //   formData.append("end_year", endYear);
  //   formData.append("description", description);
  //   formData.append("employe_type", employeType);
  //   formData.append("location", location);
  //   formData.append("location_type", locationType);
  //   formData.append("job_title", jobTitle);
  //   setShowAddExperience(false);
  //   setExperiences('');
  //   dispatch(addCreateExperience(API_URL, formData));
  // }

  function handleAddExperience() {
    const newErrors = {};

    // Validate Job Title
    if (!jobTitle || !jobTitle.trim()) {
      newErrors.jobTitle = 'Job Title is required.';
    }

    // Validate Employment Type
    if (!employeType || !employeType.trim()) {
      newErrors.employeType = 'Employment Type is required.';
    }

    // Validate Company Name
    if (!companyName || !companyName.trim()) {
      newErrors.companyName = 'Company Name is required.';
    }

    // Validate Location Type
    if (!locationType || !locationType.trim()) {
      newErrors.locationType = 'Location Type is required.';
    }

    // Validate Location
    if (!location || !location.trim()) {
      newErrors.location = 'Location is required.';
    }

    // Validate Start Date
    if (!startYear || !startYear.trim()) {
      newErrors.startYear = 'Start Date is required.';
    }

    // Validate End Date
    if (!endYear || !endYear.trim()) {
      newErrors.endYear = 'End Date is required.';
    }

    // Validate Description
    if (!description || !description.trim()) {
      newErrors.description = 'Description is required.';
    }

    // If there are errors, set them and prevent further action
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("company", companyName);
    formData.append("start_year", startYear);
    formData.append("end_year", endYear);
    formData.append("description", description);
    formData.append("employe_type", employeType);
    formData.append("location", location);
    formData.append("location_type", locationType);
    formData.append("job_title", jobTitle);

    // Dispatch action for adding experience
    setShowAddExperience(false);
    setErrors({});
    dispatch(addCreateExperience(API_URL, formData));
  }

  useEffect(() => {
    if (experienceData !== null && experienceData !== undefined && experienceData.length > 0) {
      {
        const data = experienceData[0];

        setcompanyName(data.companyName);
        // setprofileHeading(data.profileHeading);
        setstartYear(data.startYear)
        setendYear(data.endYear);
        setdescription(data.description);
        setemployeType(data.employeType);
        setlocation(data.location);
        setlocationType(data.locationType);
        setjobTitle(data.jobTitle);
        localStorage.setItem('experience_id', data.experience_id);
      }
    }
  }, [experienceData]);



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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDownloadPdf = () => {
    if (profileData && profileData.resume) {
      const pdfUrl = `${IMAGE_PATH}user/${profileData.resume}`;
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

  const handleUploadResume = () => {
    if (resumePdf) {
      handleUpate();
      console.log('Resume uploaded:', resumePdf);
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
      setProfilePic(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSaveImage = () => {
    if (profilePic) {
      handleUpate();
      console.log('profilePic uploaded:', profilePic);
    } else {
      console.error('No profilePic file selected.');
    }
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

  const handleEditSkillToggle = () => {
    setShowEditSkill(!showEditSkill);
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
    setSkill(e.target.value);
    setSkillError('');
  };

  const handleOpenExperience = () => {
    setcompanyName("");
    setstartYear("")
    setendYear("");
    setdescription("");
    setemployeType("");
    setlocation("");
    setlocationType("");
    setjobTitle("");
  }



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

                  src={
                    selectedImage ||
                    (profileData?.profilePic
                      ? IMAGE_PATH + "user/" + profileData.profilePic
                      : avatar)
                  }
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
                <Typography variant="subtitle1" component="div" className="d-flex align-items-center justify-content-between">
                  <span className="fw-bold username "> {profileData && profileData.username ? profileData.username : ""}</span>

                  <EditOutlinedIcon onClick={handleOpenDialog} />

                </Typography>
                <Typography className=" col-md-8 userinfo" variant="subtitle1" component="div">
                  {profileData && profileData.profile_heading ? profileData.profile_heading : "Default Heading"}
                </Typography>
              </CardContent>


            </div>
          </Item>
          <Card className={`${darkMode ? 'dark-card' : 'light-card'}`} sx={{
            marginTop: '10px',
            borderRadius: '8px !important',
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px !important',
          }}>
            <Box sx={{ width: '100%', typography: 'body1' }} >
              <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" className={`${darkMode ? 'dark-card' : 'light-card'}`}>
                    <Tab label="Skills" className={`${darkMode ? 'text-light' : 'text-dark'}`} value="1" />
                    <Tab label="Experience" className={`${darkMode ? 'text-light' : 'text-dark'}`} value="2" />
                    <Tab label="Resume" className={`${darkMode ? 'text-light' : 'text-dark'}`} value="3" />
                    <Tab label="Education" className={`${darkMode ? 'text-light' : 'text-dark'}`} value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1" >
                  <Card ref={addSkillCardRef} className={`p-4 ${darkMode ? 'dark-card' : 'light-card'}`}  >
                    {/* <Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3 text-dark">Skills</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddSkillToggle} /></span>
                      </div >
                      <div>
                        {skills.map((skill, index) => (
                          <React.Fragment key={skill.skills_id}>
                            <div className="d-flex align-items-center justify-content-between">
                              <span style={{ marginRight: '10px' }}>{skill.skils_name}</span>
                              <DeleteForeverOutlinedIcon onClick={() => handeldeleteSkills(skill.skills_id)} />
                            </div>
                            {index < skills.length - 1 && <hr />}
                          </React.Fragment>
                        ))}
                      </div>

                    </Typography> */}
                    <Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3">Skills</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddSkillToggle} /></span>
                      </div>
                      {skills ? (
                        <div>
                          {skills.map((skill, index) => (
                            <React.Fragment key={skill.skills_id}>
                              <div className="d-flex align-items-center justify-content-between">
                                <span style={{ marginRight: '10px' }}>{skill.skils_name}</span>
                                <div>
                                <EditOutlinedIcon onClick={handleEditSkillToggle} />
                                <DeleteForeverOutlinedIcon onClick={() => handeldeleteSkills(skill.skills_id)} />
                                </div>
                              </div>
                              {index < skills.length - 1 && <hr />}
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div>
                            <img src={skillImg} alt="Profile" className="trofie mt-2" />
                          </div>
                          <div>
                            <button className="btn btn-primary mt-4" onClick={handleAddSkillToggle}>
                              Add Skill
                            </button>
                          </div>
                        </div>

                      )}
                    </Typography>

                  </Card>

                  {/* Add skills card start */}
                  {showAddSkill &&
                    <Card className={`p-4 mt-2 ${darkMode ? 'dark-card' : 'light-card'}`} >

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 ">Add Skill*</span>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-8">
                          <input type="text" className={`form-control ${darkMode ? 'dark-input' : 'light-input'}`} value={skill} onChange={handleSkill} />
                          {skillError && <div className="text-danger">{skillError}</div>}
                        </div>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary" onClick={handleAddSkills}>
                            Save
                          </button>
                        </div>
                      </div>

                    </Card>
                  }
                   {showEditSkill &&
                    <Card className={`p-4 mt-2 ${darkMode ? 'dark-card' : 'light-card'}`} >

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 ">Edit Skill*</span>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-8">
                          <input type="text" className={`form-control ${darkMode ? 'dark-input' : 'light-input'}`} value={skill} onChange={handleSkill} />
                          {skillError && <div className="text-danger">{skillError}</div>}
                        </div>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary" onClick={handleAddSkills}>
                            Save
                          </button>
                          <button type="button" className="btn btn-outline-secondary m-2" onClick={handleAddSkills}>
                            Cancel
                          </button>
                        </div>
                      </div>

                    </Card>
                  }
                  {/* Add skills card end */}
                </TabPanel>
                <TabPanel ref={addExperienceCardRef} value="2">
                  <Card className={`p-4 ${darkMode ? 'dark-card' : 'light-card'}`} >
                    <Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3">Experience</span>
                        <span className="ms-auto fs-2">
                          <AddIcon onClick={handleAddExperienceToggle} onChange={handleOpenExperience} />
                        </span>
                      </div>
                    </Typography>
                    {experienceData ? (
                      <div className="d-flex justify-content-between">
                        <div className="col-md-12">
                          {experienceData &&
                            experienceData.map((experience) => (
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
                                  <div className="col-md-1">
                                    <DeleteForeverOutlinedIcon
                                      onClick={() => handeldeleteExperience(experience.experience_id)}
                                      style={{ marginLeft: '0.7rem', cursor: 'pointer' }}
                                    />

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
                        <div>
                          <button className="btn btn-primary mt-4" onClick={handleAddExperienceToggle}>
                            Add Experience
                          </button>
                        </div>
                      </div>

                    )}
                  </Card>
                  {/* Add experiences card start */}
                  {showAddExperience && (
                    <Card className={`p-4 mt-2 ${darkMode ? 'dark-card' : 'light-card'}`}>

                      <div className="justify-content-left d-flex">
                        <span className="fs-3">Add Experience</span>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary" onClick={handleAddExperience}>
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="box">
                        <div className="col-md-6 mt-3">
                          <label className="d-flex justify-content-left ">Job Title*</label>
                          <input
                            type="text"
                            className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                            placeholder="Ex: Full Stack Developer"
                            value={jobTitle}
                            onChange={(e) => setjobTitle(e.target.value)}
                          />
                          {errors.jobTitle && <div className="text-danger">{errors.jobTitle}</div>}

                        </div>

                        <div className="row col">

                          {/* <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Profile Headline*</label>
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="It will appear below your profile"
                              value={profileHeading}
                              onChange={(e) => setprofileHeading(e.target.value)}
                            />
                          </div> */}

                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">Employement Type*</label>
                            <select
                              type="text"
                              className={`form-select border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Title"
                              value={employeType}
                              onChange={(e) => setemployeType(e.target.value)}
                            >
                              <option >Please Select</option>
                              <option value={1}>Full Time</option>
                              <option value={2}>Self-Employeed</option>
                              <option value={3}>Freelance</option>
                              <option value={4}>Internship</option>
                              <option value={5}>Trainee</option>
                            </select>
                            {errors.employeType && <div className="text-danger">{errors.employeType}</div>}
                          </div>
                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">Company Name*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex: BytesFarms Technologies"
                              value={companyName}
                              onChange={(e) => setcompanyName(e.target.value)}
                            />
                            {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                          </div>
                        </div>

                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">Location Type*</label>
                            <select
                              type="text"
                              className={`form-select border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Title"
                              value={locationType}
                              onChange={(e) => setlocationType(e.target.value)}
                            >
                              <option >Please Select</option>
                              <option value={1}>On-Site</option>
                              <option value={2}>Hybrid</option>
                              <option value={3}>Remote</option>
                            </select>
                            {errors.locationType && <div className="text-danger">{errors.locationType}</div>}
                          </div>

                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">Location*</label>

                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Location"
                              value={location}
                              onChange={(e) => setlocation(e.target.value)}
                            />
                            {errors.location && <div className="text-danger">{errors.location}</div>}
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">Start Date*</label>
                            <input
                              type="date"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Start Date"
                              value={startYear}
                              onChange={(e) => setstartYear(e.target.value)}
                            />
                            {errors.startYear && <div className="text-danger">{errors.startYear}</div>}
                          </div>

                          <div className="col-md-6 mt-3">
                            <label className="d-flex justify-content-left ">End Date*</label>
                            <input
                              type="Date"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="End Date"
                              value={endYear}
                              onChange={(e) => setendYear(e.target.value)}
                            />
                            {errors.endYear && <div className="text-danger">{errors.endYear}</div>}
                          </div>
                          {/* 
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Industry*</label>
                            <input
                              type="text"
                              className="form-control border "
                              placeholder="Industry"
                            />
                          </div> */}

                          <div className="col-md-12 mt-3">
                            <label className="d-flex justify-content-left ">Description*</label>
                            <textarea
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              rows={5}
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                            ></textarea>
                          </div>


                        </div>
                      </div>

                      <hr/>
                    </Card>
                  )}
                  {/* Add experiences card end */}
                </TabPanel>
                <TabPanel value="3">
                  {resumePdf ? (
                    <div className={`${darkMode ? 'dark-card' : 'light-card'}`}>
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
                    <div className={`${darkMode ? 'dark-card' : 'light-card'}`}>
                      {profileData && profileData.resume ? (
                        <div>
                          <iframe
                            title="Resume PDF"
                            src={`${IMAGE_PATH}user/${profileData.resume}#toolbar=0`}
                            width="100%"
                            height="600px"
                          ></iframe>
                          <button className="btn btn-primary mx-2" onClick={handleChoosePdf}>
                            <FileUploadIcon /> Choose PDF
                          </button>
                          <button className="btn btn-success mx-2" onClick={handleDownloadPdf}>
                            <FileDownloadIcon /> Download PDF
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <img src={resumeImg} alt="Profile" className="trofie mt-2" />
                          </div>
                          <div>
                            <button className="btn btn-primary mx-2" onClick={handleResumeChange}>
                              <FileUploadIcon /> Choose PDF
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="4">
                  <Education />
                </TabPanel>
              </TabContext>
            </Box>
          </Card>

        </Grid>
        <Grid item xs={12} md={4} lg={3} >
          <Item className={`${darkMode ? 'dark-card' : 'light-card'}`}>
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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle> Edit Profile</DialogTitle>
          <DialogContent>

            <div className="row mt-4 p-0">
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">First Name <span className='text-danger'>*</span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter First Name" aria-describedby="basic-addon2" required name="amount" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Last Name<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter Last Name" aria-describedby="basic-addon2" required name="amountChangeNote" value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">User Name<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter Last Name" aria-describedby="basic-addon2" required name="amountChangeNote" value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Email<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">
                  <input className="form-control" placeholder="Enter Last Name" aria-describedby="basic-addon2" required name="amountChangeNote" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Contact Number<span className='text-danger'>*</span></label>
                <div className="input-group col-md-12 px-0 ">
                  <input type='number' className="form-control" placeholder="Enter Contact Number" aria-describedby="basic-addon2" required name="amount" value={mobile}
                    onChange={(e) => setMobile(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Address<span className='text-danger'></span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input className="form-control" placeholder="Enter Address" aria-describedby="basic-addon2" required name="amountChangeNote" value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <label for="exampleFormControlInput1" className="form-label">Profile Headline<span className='text-danger'>*</span></label>
                <div className="input-group col-md-12 px-0 ">

                  <input type='text' className="form-control" placeholder="Enter Contact Number" aria-describedby="basic-addon2" required name="amount"
                    value={profileHeading}
                    onChange={(e) => setprofileHeading(e.target.value)} />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="col-md-12 d-flex justify-content-end">
              <button className="btn btn-outline-secondary m-2" onClick={handleCloseDialog}>Cancel</button>
              <button className="btn btn-primary m-2" onClick={handleUpate}>Save </button>
            </div>
          </DialogActions>
        </Dialog>
        {/* profile edit diagol box code end*/}

      </Grid>

    </Box>


  );
}

export default Profile;
