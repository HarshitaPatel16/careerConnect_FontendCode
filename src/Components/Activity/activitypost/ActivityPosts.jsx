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
  console.log(reduxPostsData, "reduxPostsData");
  console.log("reduxPostsData", posts);
  
  useEffect(() => {
    if (reduxPostsData.readOnePost && reduxPostsData.readOnePost.data) {
      setPosts(reduxPostsData.readOnePost.data);
      console.log("reduxPostsData",reduxPostsData.readOnePost.data[0].post_id)
      // localStorage.setItem("user_id", reduxPosts.readOnePost.data[0].post_id);
    }
  }, [reduxPostsData]);

  useEffect(() => {

    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    
    dispatch(getPostById(API_URL, data));
  }, [dispatch]);

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.user_id}/>
    ))}
  </div>;
};

export default Posts;
