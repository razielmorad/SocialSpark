import { useEffect, useState } from "react";
import { getMyPosts } from "../../services/postServices";

const GetUserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await getMyPosts();
        setUserPosts(response.data);
      } catch (err) {
        setUserPosts(err.response.data);
      }
    };
    getUserPosts();
  }, []);
  return userPosts;
};
export default GetUserPosts;
