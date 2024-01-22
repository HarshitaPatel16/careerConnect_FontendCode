import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../acivityview/ActivityPost";
import "../activitypost/posts.css";
import { getPostById } from '../../../store/action/action';
import API_URL from "../../../service";
import { useState } from "react";


const Posts = () => {
 

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const reduxPostsData = useSelector((state) => state.post);
  console.log("Redux Posts Data:", reduxPostsData);
  
  
  // useEffect(() => {
  //   if (reduxPostsData.readOnePost && reduxPostsData.readOnePost.data) {
  //     setPosts(reduxPostsData.readOnePost.data);
  //     console.log("reduxPostsData11",reduxPostsData.readOnePost.data[0].post_id)
  //     // localStorage.setItem("user_id", reduxPosts.readOnePost.data[0].post_id);
  //   }
  // }, [reduxPostsData]);

  useEffect(() => {
    if (reduxPostsData.readOnePost && reduxPostsData.readOnePost) {
      setPosts(reduxPostsData.readOnePost);
      console.log("Received data:", reduxPostsData.readOnePost);
    }
  }, [reduxPostsData]);
  
  

  useEffect(() => {

    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    
    dispatch(getPostById(API_URL, data));
  }, [dispatch]);

  return   <div className="posts">
  {posts.length > 0 ? (
    posts.map((post) => <Post post={post} key={post.post_id} />)
  ) : (
    <p>No posts available</p>
  )}
</div>
  // return (
  //   <div className="posts">
  //     {posts.length > 0 ? (
  //       posts.map((post) => <Post post={post} key={post.user_id} />)
  //     ) : (
  //       <p>No posts available</p>
  //     )}
  //   </div>
  // );
  
};

export default Posts;
