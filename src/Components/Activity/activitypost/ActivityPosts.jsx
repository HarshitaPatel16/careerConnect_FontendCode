import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../acivityview/ActivityPost";
import "../activitypost/posts.css";
import { getPostById } from '../../../store/action/action';
import API_URL from "../../../service";
import { useState } from "react";


const Posts = ({ searchValue, userData }) => {
 

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const reduxPostsData = useSelector((state) => state.post);
  console.log("Redux Posts Data:", reduxPostsData);
  
 

  useEffect(() => {
    if (reduxPostsData.readOnePost && reduxPostsData.readOnePost) {
      setPosts(reduxPostsData.readOnePost);
      console.log("Received data:", reduxPostsData.readOnePost);
    }
  }, [reduxPostsData]);
  
  const [filteredPosts, setFilteredPosts] = useState([]);

  // useEffect(() => {
  //   if (reduxPostsData.readOnePost && reduxPostsData.readOnePost.data) {
  //     // If there's no search value, set all posts
  //     if (!searchValue) {
  //       setFilteredPosts(reduxPostsData.readOnePost.data);
  //     } else {
  //       // If there's a search value, filter posts based on username
  //       const filtered = reduxPostsData.readOnePost.data.filter((post) =>
  //         post.username.toLowerCase().includes(searchValue.toLowerCase())
  //       );
  //       setFilteredPosts(filtered);
  //     }
  //   }
  // }, [reduxPostsData, searchValue]);

  const user_id = userData && userData.user_id; // Check if user_id exists in userData

  useEffect(() => {
    if (user_id) {
      // Fetch posts for the specified user_id
      dispatch(getPostById(API_URL, { user_id }));
    }
  }, [dispatch, user_id]);


  // useEffect(() => {

  //   const data = {
  //     user_id: localStorage.getItem("user_id"),
  //   };
    
  //   dispatch(getPostById(API_URL, data));
  // }, [dispatch]);

  return   <div className="posts">
  {posts.length > 0 ? (
    posts.map((post) => <Post post={post} key={post.post_id} />)
  ) : (
    <p>No posts available</p>
  )}
</div>
 
};

export default Posts;
