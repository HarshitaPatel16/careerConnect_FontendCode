import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./comments.css";
import { addCreateComment, getCommentById } from "../../store/action/action";
import API_URL from "../../service";
import IMAGE_PATH from "../../imageService";
import avatar from '../../assets/avatar5.png';

import { useState } from "react";
const Comments = ({ post_id }) => {

  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(""); // State to store text input
  console.log(comments, "comments121")
  const [postId, setPostId] = useState(post_id);
  const reduxComment = useSelector((state) => state.comment);
  console.log(reduxComment, "reduxCommentchandan"); // Check the structure here



  
  

  useEffect(() => {
    if (reduxComment.readOneComment) {
      console.log(reduxComment.readOneComment, "reduxComment.readOneComment")
      setComments(reduxComment.readOneComment);
    }
  }, [reduxComment]);

  useEffect(() => {
    dispatch(getCommentById(API_URL, postId));
  }, [dispatch, postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentClick = () => {
        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("post_id", postId); 
        formData.append("comment", comment);

        dispatch(addCreateComment(API_URL, formData));
        setComment("");
    
};


  //Temporary
 
  return (
    <div className="comments">
      <div className="write">
        <img src={avatar} alt="" />
        <input type="text" value={comment}   onChange={handleCommentChange}
          placeholder="write a comment" />
        <button onClick={handleCommentClick}>Send</button>
      </div>
      {comments.map((commentData) => (
        <div className="comment">
          <img src={  (commentData?.profilePic
    ? IMAGE_PATH + "user/" + commentData.profilePic
    : avatar)}  alt="" />
          <div className="info">
            <span>{commentData.username}</span>
            <p>{commentData.comment}</p>
          </div>
          {/* <span className="date">1 hour ago</span> */}
        </div>
      ))}
      
       
   
    </div>
  );
};

export default Comments;
