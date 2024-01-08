import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from '../../assets/avatar5.png';
import IMAGE_PATH from "../../imageService";
import API_URL from "../../service";
import React, { useEffect, useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { addCreateLikes, getLikeById } from "../../store/action/action";

const Post = ({ post }) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const reduxLike = useSelector((state) => state.like);



  console.log(post, "postkk")
  const dispatch = useDispatch();

  //   const handleLikesClick = () => {
  //         const formData = new FormData();
  //         formData.append("user_id", localStorage.getItem("user_id"));
  //         formData.append('post_id', post.post_id);
  //         formData.append("IsLiked", liked);

  //         dispatch(addCreateLikes(API_URL, formData));

  // };



  const handleLikesClick = async () => {
    // Check if the user has already liked the post
    if (liked) {
      // Handle case where the user has already liked the post
      console.log('User has already liked the post');
      return;
    }

    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append('post_id', post.post_id);
    formData.append("IsLiked", true);

    try {
      // Assuming your addCreateLikes action is asynchronous and returns a promise
      await dispatch(addCreateLikes(API_URL, formData));

      // Update the liked state based on the action response
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error("Error handling like:", error);
      // Handle the error if needed
    }
  };

  const [commentOpen, setCommentOpen] = useState(false);
  //TEMPORARY
  const [likeCount, setLikeCount] = useState(post.likes || 0); // Use post.likes if available, otherwise default to 0
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (reduxLike.readOneLike && reduxLike.readOneLike.data) {
      setLiked(reduxLike.readOneLike.data);
    }
  }, [reduxLike]);

  useEffect(() => {
    dispatch(getLikeById(API_URL));
  }, [dispatch]);

  // const liked = false;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    // You may want to send a request to your backend to update the like status in the database
  };

  return (
    <div className="post">
      <div className={`container ${darkMode ? 'dark-card' : 'light-card'}`} >
        <div className="user">
          <div className="userInfo">
            <img src={(post?.profilePic
              ? IMAGE_PATH + "user/" + post.profilePic
              : avatar)} alt="" />
            <div className="details">
              <Link
                // to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              {/* <span className="date">1 min ago</span> */}
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          {post.desc && <p className="d-flex">{post.desc}</p>}
          {post.post_img_path && post.post_img_path.endsWith(".mp4") ? (
            <video controls width="100%">
              <source src={IMAGE_PATH + "post/" + post.post_img} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={IMAGE_PATH + "post/" + post.post_img} alt="" />
          )}


          {/* <img src={IMAGE_PATH +"post/" + post.post_img} alt="" /> */}
        </div>
        <div className="info">
          <div className="item" onClick={handleLikesClick}>
            {liked ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : <FavoriteBorderOutlinedIcon />}
            {likeCount} Likes
          </div>

          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments post_id={post.post_id} />} {/* Pass post_id as a prop */}
        {/* {commentOpen && <Comments />} */}
      </div>
    </div>
  );
};

export default Post;
