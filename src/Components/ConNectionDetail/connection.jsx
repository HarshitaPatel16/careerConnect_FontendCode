import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import SidebarRight from "../SidebarRight/SidebarRight";
import Avatar from '@mui/material/Avatar';
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
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import avatar from '../../assets/avatar5.png';
import resumeImg  from "../../assets/resume.png"
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


    const handeldeleteSkills = () => {
        const data = {
            skills_id: localStorage.getItem("skills_id"),
            user_id: localStorage.getItem("user_id"),
        };
        dispatch(deleteSkills(API_URL, data));
    };

    const handeldeleteExperience = () => {
        const data = {
            experience_id: localStorage.getItem("experience_id"),
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
        // formData.append("profilePic", profilePic);
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

        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("skils_name", skill);
        setShowAddSkill(false);
        setSkill('');

        dispatch(addCreateSkills(API_URL, formData));
    }

    function handleAddExperience() {

        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("company", companyName);
        formData.append("profile_heading", profileHeading);
        formData.append("start_year", startYear);
        formData.append("end_year", endYear);
        formData.append("description", description);
        formData.append("employe_type", employeType);
        formData.append("location", location);
        formData.append("location_type", locationType);
        formData.append("job_title", jobTitle);
        setShowAddExperience(false);
        setExperiences('');
        dispatch(addCreateExperience(API_URL, formData));
    }

    useEffect(() => {
        if (experienceData !== null && experienceData !== undefined && experienceData.length > 0) {
            {
                const data = experienceData[0];

                setcompanyName(data.companyName);
                setprofileHeading(data.profileHeading);
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
        <Box sx={{ flexGrow: 1 }}>
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
                            </div>
                            <CardContent>
                                <Typography variant="subtitle1" component="div" className="d-flex align-items-center justify-content-between">
                                    <span className="fw-bold username "> {profileData && profileData.username ? profileData.username : ""}</span>

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
                                                {skills.map((skill, index) => (
                                                    <React.Fragment key={skill.skills_id}>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span style={{ marginRight: '10px' }}>{skill.skils_name}</span>
                                                        </div>
                                                        {index < skills.length - 1 && <hr />}
                                                    </React.Fragment>
                                                ))}
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
                                        <div className="d-flex justify-content-start">
                                            <div className="ms-3">
                                                {experienceData &&
                                                    experienceData.map((experience) => (
                                                        <div key={experience.experience_id} className="d-flex align-items-center ms-3">
                                                            {/* Map the Avatar for each experience */}
                                                            <Avatar>{experience.company.charAt(0).toUpperCase()}</Avatar>
                                                            <div className="ms-3 ">
                                                                <h6 className="fw-bold mt-2 mb-0 d-flex">
                                                                    {experience.job_title}{' '}

                                                                </h6>
                                                                <p className="fw-normal text-secondary mb-0 d-flex">{experience.company},</p>
                                                                <p className="fw-normal text-secondary mb-0 d-flex">
                                                                    {new Date(experience.start_year).toLocaleDateString()} - {new Date(experience.end_year).toLocaleDateString()}
                                                                </p>
                                                                <p className="fw-normal text-secondary mb-0 d-flex">
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
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

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
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleResumeChange}
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                            />
                                            <div>
                                                <div>
                                                    <iframe
                                                        title="Resume PDF"
                                                        src={`${IMAGE_PATH}user/${profileData ? profileData.resume : ""}#toolbar=0`}
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
                                </TabPanel>
                                <TabPanel value="5">
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


                    </DialogContent>
                    <DialogActions className="d-flex justify-content-center">
                        <button className="btn btn-danger" onClick={handleCloseDialog}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleUpate}>Save </button>
                    </DialogActions>
                </Dialog>
                {/* profile edit diagol box code end*/}

            </Grid>

        </Box>


    );
}

export default ConnectionDetail;
