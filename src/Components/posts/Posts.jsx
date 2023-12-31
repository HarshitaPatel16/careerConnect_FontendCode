import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import "./posts.css";
import { getreadAllPostData } from '../../store/action/action';
import API_URL from "../../service";
import { useState } from "react";


const Posts = () => {
 

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const reduxPosts = useSelector((state) => state.post);
  console.log(reduxPosts, "reduxPosts222");
  console.log("Posts component - posts111:", posts);
  
  useEffect(() => {
    if (reduxPosts.readAllPost && reduxPosts.readAllPost.data) {
      setPosts(reduxPosts.readAllPost.data);
      console.log("reduxPosts",reduxPosts.readAllPost.data[0].post_id)
      // localStorage.setItem("post_id", reduxPosts.readAllPost.data[0].post_id);
    }
  }, [reduxPosts]);

  useEffect(() => {
    dispatch(getreadAllPostData(API_URL));
  }, [dispatch]);

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.post_id}/>
    ))}
  </div>;
};

export default Posts;
