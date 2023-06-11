import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { getAllUsers } from "../services/useservices";
import Post from "./post";
import { useAuth } from "./context/auth.context";
import MiniCreatePost from "./miniCreatePost";
import Sidebar from "./sidebar";

const Home = () => {
  const [usersPosts, setUsersPosts] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const getPosts = async () => {
      const response = await getAllPosts();
      setPosts(response.data);
    };
    getPosts();
  }, []);
  useEffect(() => {
    const getUsersDetails = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    getUsersDetails();
  }, []);

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  useEffect(() => {
    const usersForPosts = () => {
      const findingUser = sortedPosts.map((post) => {
        const matchingUser = users.find((user) => user._id === post.user_id);
        if (matchingUser) {
          return {
            ...post,
            firstName: matchingUser.firstName,
            lastName: matchingUser.lastName,
            profileImg: matchingUser.profileImg,
            user_id: matchingUser._id,
          };
        }
        return post;
      });
      setUsersPosts(findingUser);
    };

    usersForPosts();
  }, [users, sortedPosts]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <div className="d-flex flex-column align-items-center">
          <MiniCreatePost setPosts={setPosts} />
          {!usersPosts.length ? (
            <p className="text-center fs-4 mt-5">no posts yet</p>
          ) : (
            <div className="row">
              {usersPosts &&
                usersPosts.map((post) => (
                  <div className="col-12" key={post._id}>
                    <div className="w-100">
                      <Post
                        post={post}
                        firstName={post.firstName}
                        lastName={post.lastName}
                        profileImg={post.profileImg}
                        user_id={post.user_id}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
