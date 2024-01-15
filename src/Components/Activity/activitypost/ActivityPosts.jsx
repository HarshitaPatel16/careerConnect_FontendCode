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
      // localStorage.setItem("post_id", reduxPosts.readOnePost.data[0].post_id);
    }
  }, [reduxPostsData]);

  useEffect(() => {
    dispatch(getPostById(API_URL));
  }, [dispatch]);

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.post_id}/>
    ))}
  </div>;
};

export default Posts;
