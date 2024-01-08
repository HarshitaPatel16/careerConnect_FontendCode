import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import edImg from "../../assets/Education.png"
import { DarkModeContext } from '../context/darkModeContext';



function Education() {
    

    const [showAddEducation, setshowAddEducation] = useState(false);
    const [value, setValue] = React.useState('1');
    const [showAddSkill, setShowAddSkill] = useState(false);
    const [showAddExperience, setShowAddExperience] = useState(false);
    const [skill, setSkill] = useState("")
    const [userId, setUserId] = useState("")
    const [experiences, setExperiences] = useState("");
    const [isCoverEditable, setisCoverEditable] = useState(false);
    const [selectedCoverImage, setselectedCoverImage] = useState(null);
    const [isProfileChangeDialogOpen, setisProfileChangeDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [profileImg, setProfileImg] = useState([]);
    const [files, setFiles] = useState([]);
    console.log("files", files)
    const [isCameraStarted, setCameraStarted] = useState(false);
    const [resumePdf, setResumePdf] = useState(null);
    const [showUploadButton, setShowUploadButton] = useState(false);
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
    const { toggle, darkMode } = useContext(DarkModeContext);


    const handleAddEducationToggle = () => {
        setshowAddEducation(!showAddEducation);
    };

    return (
        <>
            <Card className={`p-4 ${darkMode ? 'dark-card' : 'light-card'}`}>
                <Typography variant="subtitle1" component="div">
                    <div className="d-flex justify-content-between">
                        <span className="fs-3 ">Education</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddEducationToggle} /></span>
                    </div >
                    <div>
                          <div>
                            <img src={edImg} alt="Profile" className="trofie mt-2" />
                          </div>
                          <div>
                            <button className="btn btn-primary mx-2 mt-5" onClick={handleAddEducationToggle}>
                              Add Education
                            </button>
                          </div>
                        </div>
                    <div>

                        <React.Fragment >
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                <p className="fw-normal text-secondary mb-0 d-flex"> </p>
                                </div>
                                <DeleteForeverOutlinedIcon />
                            </div>
                            <hr />
                        </React.Fragment>

                    </div>

                </Typography>

            </Card>
            {showAddEducation && (
                    <Card className={`p-4 mt-2 ${darkMode ? 'dark-card' : 'light-card'}`}>

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 ">Add Education</span>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary" >
                            Save
                          </button>
                        </div>
                      </div>


                      <div className="box">

                        <div className="row   col">
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">School*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex:Boston University"
                              value={jobTitle}
                              onChange={(e) => setjobTitle(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Degree*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex. B.Tech"
                              value={profileHeading}
                              onChange={(e) => setprofileHeading(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Field of Study*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex : IT"
                              value={employeType}
                              onChange={(e) => setemployeType(e.target.value)}
                            />
                            
                          </div>
                        </div>
                        <div className="row d-flex justify-content-left   col">
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Start Date*</label>
                            <input
                              type="date"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Start Date"
                              value={startYear}
                              onChange={(e) => setstartYear(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">End Date*</label>
                            <input
                              type="Date"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="End Date"
                              value={endYear}
                              onChange={(e) => setendYear(e.target.value)}
                            />
                          </div>
                          
                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Grade*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Industry"
                            />
                          </div>

                          <div className="col-md-12 mt-3">
                            <label className="d-flex justify-content-left ">Activity and Society*</label>
                            <textarea className={`form-control border py-1 ${darkMode ? 'dark-input' : 'light-input'}`} rows={5}
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                            ></textarea>
                          </div>


                        </div>
                      </div>


                    </Card>
                  )}
        </>
    );
}

export default Education;
