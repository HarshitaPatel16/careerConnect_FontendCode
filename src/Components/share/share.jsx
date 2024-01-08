import React, { useState, useContext } from "react";
import "../share/share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { addCreatePost } from "../../store/action/action";
import { getProfileById } from "../../store/action/action";
import API_URL from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import IMAGE_PATH from "../../imageService";
import avatar from '../../assets/avatar5.png';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from "../context/darkModeContext";

const Share = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.user.readOneUser);
    const { toggle, darkMode } = useContext(DarkModeContext);


    const [username, setUsername] = useState(""); // Add state to store username
    const [profilePic, setProfileImage] = useState("");
    const [coverPic, setCoverImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [desc, setDesc] = useState("");
    const [postImg, setPostImg] = useState("");

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




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setSelectedVideo(null);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedVideo(file);
            setSelectedImage(null);
        }
    };

    const handleRemoveMedia = () => {
        setSelectedImage(null);
        setSelectedVideo(null);
    };

    const handleShareClick = () => {
        if (text || selectedImage || selectedVideo) {
            const formData = new FormData();
            formData.append("user_id", localStorage.getItem("user_id"));
            formData.append("desc", text);
            formData.append("post_img", selectedImage || selectedVideo);
    
            dispatch(addCreatePost(API_URL, formData));
                setText("");
            setSelectedImage(null);
            setSelectedVideo(null);
        }
    };
    



    const [text, setText] = useState(""); // State to store text input

    const handleTextChange = (e) => {
        setText(e.target.value);
    };




    return (
        <div className="share">
            <div className={`container ${darkMode ? 'dark-card' : 'light-card'}`}>
                <div className="top">
                    <img
                        src={
                            (profileData?.profilePic
                                ? IMAGE_PATH + "user/" + profileData.profilePic
                                : avatar)
                        }
                        alt=""
                    />
                    <input type="text"  value={text}
                        onChange={handleTextChange}
                            placeholder={`What's on your mind?`} />
                </div>
                {(selectedImage || selectedVideo) && (
                    <div className="preview">
                        {selectedImage && (
                            <img
                                width="100%" height="100%"
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Preview"
                            />
                        )}
                        {selectedVideo && (
                            <video width="100%" height="100%" controls>
                                <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <DeleteOutlineIcon onClick={handleRemoveMedia}/>
                    </div>
                )}
                <hr />
                <div className="bottom">
                    <div className="left1">
                        <input
                            type="file"
                            id="imageFile"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <label htmlFor="imageFile">
                            <div className="item">
                                <AddPhotoAlternateOutlinedIcon/>
                                <span>Add Image</span>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="videoFile"
                            style={{ display: "none" }}
                            onChange={handleVideoChange}
                            accept="video/*"
                        />
                        <label htmlFor="videoFile">
                            <div className="item">
                                <SmartDisplayOutlinedIcon/>
                                <span>Add Video</span>
                            </div>
                        </label>
                    </div>
                    <div className="right1">
                        {(text || selectedImage || selectedVideo) && (
                            <button className="btn btn-primary" onClick={handleShareClick}>Post</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
