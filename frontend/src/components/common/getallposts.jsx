import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postServices";

const GetPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await getAllPosts();
      setPosts(response.data);
    };
    getPosts();
  }, []);
  return posts;
};
export default GetPosts;
