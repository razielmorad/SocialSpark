import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth.context";
import React, { useEffect } from "react";

const UnLoggedHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <>
      <div className="container ">
        <div className="mb-4 bg-secondary rounded-3">
          {" "}
          <header className="mb-auto text-center">
            <div>
            <nav className="nav  justify-content-between float-md-end">
              <Link
                to={"/ulHome"}
                className="nav-link fw-bold py-1 px-0 mx-3 text-black"
              >
                Home
              </Link>
              <Link
                to={"/ulAbout"}
                className="nav-link fw-bold py-1 px-0 mx-3 text-black"
              >
                About
              </Link>
              <Link
                to={"/signup"}
                className="nav-link fw-bold py-1 px-0 mx-3 text-black"
              >
               Sign Up
              </Link>
              <Link
                to={"/signin"}
                className="nav-link fw-bold py-1 px-0 mx-3 text-black"
              >
               Sign In
              </Link>
            </nav>
            </div>
          </header>
          <div className="container-fluid py-5">
            <h1 className="app-heading px-3">
              Social <i className="bi bi-chat-left-text-fill"></i> Spark
            </h1>
            <p className=" fs-6">
              Welcome to our social network, where you can connect with friends,
              share your passions, and explore a wide range of interests. Join
              conversations, discover new opportunities, and create meaningful
              connections along the way.
            </p>
            <Link
              to={"/ulAbout"}
              className="btn btn-outline-light btn-lg"
              type="button"
            >
              About Us
            </Link>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Sign In To Social Spark</h2>
              <p>
                Welcome back! Sign in to access your account and dive back into
                the social network. Stay connected with friends, explore
                engaging content, and stay up to date with the latest trends and
                conversations.
              </p>
              <Link
                to={"/signin"}
                className="btn btn-outline-light"
                type="button"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <h2>Sign Up To Social Spark</h2>
              <p>
                Ready to reconnect? Sign in to your account and rediscover the
                social network experience. Engage with your connections, share
                your thoughts, and be a part of the exciting conversations
                happening right now.
              </p>
              <Link
                to={"/signup"}
                className="btn btn-outline-secondary"
                type="button"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-body-secondary border-top">
          © 2023
        </footer>
      </div>
    </>
  );
};

export default UnLoggedHome;
