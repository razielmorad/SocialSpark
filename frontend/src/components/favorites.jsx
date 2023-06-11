import React, { useEffect, useState } from "react";
import { getAllPosts, getLikedPosts } from "../services/postServices";
import { getAllUsers } from "../services/useservices";
import Post from "./post";
import { useAuth } from "./context/auth.context";

const Favorites = () => {
  const [usersPosts, setUsersPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const { user } = useAuth();
  const id = user._id;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await getLikedPosts(id);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
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

  useEffect(() => {
    const usersForPosts = () => {
      if (typeof posts !== "string") {
        const sortedPosts = posts.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });

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
      }
    };

    usersForPosts();
  }, [users, posts]);

  return (
    <div className="flex-grow-1">
      <div className="d-flex flex-column align-items-center ">
        {!usersPosts.length ? (
          <p className="text-center fs-4 mt-5">No favorite posts yet!</p>
        ) : (
          <div className="container ">
            <div className="row justify-content-center">
              {usersPosts.map((post) => (
                <div className="col-md-10" key={post._id}>
                  <Post
                    post={post}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    profileImg={post.profileImg}
                    user_id={post.user_id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default Favorites;
