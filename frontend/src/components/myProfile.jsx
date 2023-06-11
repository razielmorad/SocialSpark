import React, { useState } from "react";
import GetMyUser from "./common/getMyUser";
import GetUserPosts from "./common/getUserPosts";
import ProfileImageUpload from "./common/profileImage";
import Post from "./post";
import { setUserProfileImg } from "../services/useservices";
function MyProfile() {
  const user = GetMyUser();
  const posts = GetUserPosts();
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <>
      <div className="container">
        <div className="d-flex flex-fill flex-column align-items-center">
          <div className="my-4 col-sm-12 col-md-4 col-lg-3 justify-content-center d-flex">
            <ProfileImageUpload />
          </div>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <br />
          <h1>
            {user.firstName} {user.lastName}
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
              firstName={user.firstName}
              lastName={user.lastName}
              profileImg={user.profileImg}
              user_id={user._id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default MyProfile;
