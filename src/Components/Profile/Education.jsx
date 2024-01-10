import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import edImg from "../../assets/Education.png"
import { DarkModeContext } from '../context/darkModeContext';
import { addCreateEducations, getEducationsById, deleteEducation } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../service";
import expImg from "../../assets/experience.png"
import Avatar from '@mui/material/Avatar';



function Education() {
  const dispatch = useDispatch();


    const [showAddEducation, setshowAddEducation] = useState(false);
    const educationData = useSelector((state) => state.user.readOneEducation);


    const [activities, setactivities] = useState("");
    const [fieldofstudy, setfieldofstudy] = useState("");
    const [institutionName, setinstitutionName] = useState("");
    const [degree, setdegree] = useState("");
    const [startYear, setstartYear] = useState("");
    const [endYear, setendYear] = useState("");
    const [errors, setErrors] = useState({});
    const { toggle, darkMode } = useContext(DarkModeContext);


    function handleAddEducations() {
      const newErrors = {};
  
      // Validate Job Title
      if (!institutionName || !institutionName.trim()) {
        newErrors.institutionName = 'school is required.';
      }
  
      // Validate Employment Type
      if (!degree || !degree.trim()) {
        newErrors.degree = 'degree Type is required.';
      }
  
      // Validate Company Name
      if (!activities || !activities.trim()) {
        newErrors.activities = 'activities Name is required.';
      }
  
      // Validate Location Type
      if (!fieldofstudy || !fieldofstudy.trim()) {
        newErrors.fieldofstudy = 'fieldofstudy Type is required.';
      }
  
      // Validate Start Date
      if (!startYear || !startYear.trim()) {
        newErrors.startYear = 'Start Date is required.';
      }
  
      // Validate End Date
      if (!endYear || !endYear.trim()) {
        newErrors.endYear = 'End Date is required.';
      }
  
     
      // If there are errors, set them and prevent further action
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      // If no errors, proceed with form submission
      const formData = new FormData();
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("institution_name", institutionName);
      formData.append("start_year", startYear);
      formData.append("end_year", endYear);
      formData.append("degree", degree);
      formData.append("field_of_study", fieldofstudy);
      formData.append("activities", activities);
    
      // Dispatch action for adding experience
      setshowAddEducation(false);
      setErrors({});
      dispatch(addCreateEducations(API_URL, formData));
    }

    useEffect(() => {
      const data = {
        user_id: localStorage.getItem("user_id"),
      };
  
      dispatch(getEducationsById(API_URL, data));
    }, [dispatch]);
  

    useEffect(() => {
      if (educationData !== null && educationData !== undefined && educationData.length > 0) {
        {
          const data = educationData[0];
  
          setactivities(data.activities);
          setstartYear(data.startYear)
          setendYear(data.endYear);
          setfieldofstudy(data.fieldofstudy);
          setinstitutionName(data.institutionName);
          setdegree(data.degree);
         
          localStorage.setItem('education_id', data.education_id);
        }
      }
    }, [educationData]);

    const handleAddEducationToggle = () => {
        setshowAddEducation(!showAddEducation);
    };
    
    const handeldeleteEducation = (id) => {
      const data = {
        education_id: id,
        user_id: localStorage.getItem("user_id"),
      };
      console.log(data, "--console.log(data);");
      dispatch(deleteEducation(API_URL, data));
    };
    return (
        <>
            <Card className={`p-4 ${darkMode ? 'dark-card' : 'light-card'}`}>
                {/* <Typography variant="subtitle1" component="div">
                    <div className="d-flex justify-content-between">
                        <span className="fs-3 ">Education</span>
                        <span className="ms-auto fs-2"><AddIcon onClick={handleAddEducationToggle}  /></span>
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

                </Typography> */}

<Typography variant="subtitle1" component="div">
                      <div className="d-flex justify-content-between">
                        <span className="fs-3">Experience</span>
                        <span className="ms-auto fs-2">
                          <AddIcon onClick={handleAddEducationToggle} />
                        </span>
                      </div>
                    </Typography>
                    {educationData ? (
                      <div className="d-flex justify-content-between">
                        <div className="col-md-12">
                          {educationData &&
                            educationData.map((experience) => (
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
                                  <div className="col-md-1">
                                    <DeleteForeverOutlinedIcon
                                      onClick={() => handeldeleteEducation(experience.education_id)}
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
                          <button className="btn btn-primary mt-4" onClick={handleAddEducationToggle}>
                            Add Experience
                          </button>
                        </div>
                      </div>

                    )}
            </Card>
            {showAddEducation && (
                    <Card className={`p-4 mt-2 ${darkMode ? 'dark-card' : 'light-card'}`}>

                      <div className="justify-content-left d-flex">
                        <span className="fs-3 ">Add Education</span>
                        <div className="ms-auto">
                          <button type="button" className="btn btn-primary" onClick={handleAddEducations} >
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
                              value={institutionName}
                              onChange={(e) => setinstitutionName(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Degree*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex. B.Tech"
                              value={degree}
                              onChange={(e) => setdegree(e.target.value)}
                            />
                          </div>

                          <div className="col-md-4 mt-3">
                            <label className="d-flex justify-content-left ">Field of Study*</label>
                            <input
                              type="text"
                              className={`form-control border ${darkMode ? 'dark-input' : 'light-input'}`}
                              placeholder="Ex : IT"
                              value={fieldofstudy}
                              onChange={(e) => setfieldofstudy(e.target.value)}
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
                              value={activities}
                              onChange={(e) => setactivities(e.target.value)}
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
