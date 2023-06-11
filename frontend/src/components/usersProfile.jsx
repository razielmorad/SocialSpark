import React, { useEffect, useState } from "react";
import profilePlaceHolder from "../media/icons/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png";
import Post from "./post";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./context/auth.context";
import { getUserPosts } from "../services/postServices";
import { getUser } from "../services/useservices";
function UsersProfile() {
  const [profileUser, setProfileUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      if (id === user._id) {
        navigate("/myProfile");
        return;
      }
      try {
        const response = await getUser(id);
        const postResponse = await getUserPosts(id);
        setProfileUser(response.data);
        setPosts(postResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [id, user, navigate]);

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      {profileUser && (
        <>
          {" "}
          <div className="container">
            <div className="d-flex flex-fill flex-column align-items-center">
              <div className="col-sm-12 col-md-4 col-lg-3 justify-content-center d-flex mt-4">
                <img
                  className="icon-container profile-image p-4"
                  alt="Profile"
                  src={
                    profileUser.profileImg
                      ? profileUser.profileImg
                      : profilePlaceHolder
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center">
              <br />
              <h1>
                {profileUser.firstName} {profileUser.lastName}
              </h1>
              <h2>Latest Posts</h2>
            </div>
          </div>
          {!sortedPosts.length ? (
            <p>no posts yet</p>
          ) : (
            <div className="">
              {sortedPosts.map((post) => (
                <Post
                  post={post}
                  key={post._id}
                  firstName={profileUser.firstName}
                  lastName={profileUser.lastName}
                  profileImg={profileUser.profileImg}
                />
              ))}
            </div>
          )}{" "}
        </>
      )}
    </>
  );
}

export default UsersProfile;
