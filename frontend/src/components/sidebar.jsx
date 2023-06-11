import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyUser } from "../services/useservices";
import profilePlaceHolder from "../media/icons/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png";

function Sidebar() {
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const response = await getMyUser();
      setUserDetails(response.data);
    };
    getUser();
  }, []);

  return (
    <div className="sidebar ">
      <ul className="nav nav-pills  flex-column">
        <li className="nav-item">
          <Link to={"/"} className="fw-bold nav-link link-body-emphasis">
            Home
          </Link>
        </li>
        <hr />
        <li>
          <Link
            to={"/post"}
            className="nav-link link-body-emphasis mb-3 fw-bold"
          >
            Post
          </Link>
        </li>
        <li>
          <Link
            to={"/likedPosts"}
            className="nav-link link-body-emphasis mb-3 fw-bold"
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            to={"/about"}
            className="nav-link link-body-emphasis mb-3 fw-bold"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={"/contactUs"}
            className="nav-link link-body-emphasis mb-5 fw-bold"
          >
            Contact
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <Link
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={userDetails.profileImg || profilePlaceHolder}
            alt="profile"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <li className="d-flex  text-black justify-content-center fw-bold">
            {userDetails.firstName} {userDetails.lastName}
          </li>
        </Link>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <Link className="dropdown-item" to={"/myProfile"}>
              My Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to={"/signout"}>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
