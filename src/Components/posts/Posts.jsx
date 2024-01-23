import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import "./posts.css";
import { getreadAllPostData } from '../../store/action/action';
import API_URL from "../../service";
import { useState } from "react";


const Posts = ({ searchValue }) => {
 

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const reduxPosts = useSelector((state) => state.post);
  console.log(reduxPosts, "reduxPosts222");
  console.log("Posts component - posts111:", posts);
  
  // useEffect(() => {
  //   if (reduxPosts.readAllPost && reduxPosts.readAllPost.data) {
  //     setPosts(reduxPosts.readAllPost.data);
  //     console.log("reduxPosts",reduxPosts.readAllPost.data[0].post_id)
  //     // localStorage.setItem("post_id", reduxPosts.readAllPost.data[0].post_id);
  //   }
  // }, [reduxPosts]);

  useEffect(() => {
    if (reduxPosts.readAllPost && reduxPosts.readAllPost.data) {
      // If there's no search value, set all posts
      if (!searchValue) {
        setFilteredPosts(reduxPosts.readAllPost.data);
      } else {
        // If there's a search value, filter posts based on username
        const filtered = reduxPosts.readAllPost.data.filter((post) =>
          post.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    }
  }, [reduxPosts, searchValue]);

  useEffect(() => {
    dispatch(getreadAllPostData(API_URL));
  }, [dispatch]);


  const [filteredPosts, setFilteredPosts] = useState([]);



  return   <div className="posts">
  {filteredPosts.map((post) => (
    <Post post={post} key={post.post_id} />
  ))}
</div>
  // <div className="posts">
  //   {posts.map(post=>(
  //     <Post post={post} key={post.post_id}/>
  //   ))}
  // </div>;
};

export default Posts;
