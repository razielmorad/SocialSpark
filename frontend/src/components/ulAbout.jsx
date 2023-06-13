import userProfile from "../media/images/3135715.png";
import mobile from "../media/images/modern-portfolio-devices.png";
import newsFeed from "../media/images/coffee-1869772_1280.jpg";
import search from "../media/images/search-2951638_1280.jpg";
import interactions from "../media/images/handshake-3139227_1280.jpg";
import profiles from "../media/images/profiles.jpg";
import { Link } from "react-router-dom";

const UlAbout = () => {
  return (
    <>
      <div className="bg-dark">
        <div className="container">
          {" "}
          <div className="d-flex flex-column">
            <header className="mb-auto text-center">
              <div>
                <nav className="nav justify-content-between float-md-end">
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

            <div className="row mt-4">
              {" "}
              <h1 className="display-4 text-light">
                Social<span className="text-primary">S</span>park - About Us
              </h1>
              <p className="lead text-muted">
                A social networking platform connecting people worldwide.
              </p>
              <div className="col-lg-4">
                <img
                  src={userProfile}
                  alt="userProfile"
                  className="bd-placeholder-img rounded-circle "
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">User Profiles</h2>
                <p className="text-light">
                  Create a personalized profile to showcase your interests,
                  hobbies, and information.
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={newsFeed}
                  alt="newsFeed"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">News Feed</h2>
                <p className="text-light">
                  Stay up to date with the latest posts, photos, and events
                  shared by your network.
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={search}
                  alt="search"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">Search and Discovery</h2>
                <p className="text-light">
                  Easily find and connect with new friends and pages through our
                  intuitive search and discovery feature.
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={interactions}
                  alt="interactions"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">User Interactions</h2>
                <p className="text-light">
                  Engage with the content shared by others through likes and
                  comments.
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={profiles}
                  alt="profiles"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">Profiles</h2>
                <p className="text-light">
                  Discover pages to stay updated with the latest news and
                  information.
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={mobile}
                  alt="mobile"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                ></img>
                <h2 className="fw-normal text-light">Mobile Accessibility</h2>
                <p className="text-light">
                  Access our social network on the go through our mobile
                  application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UlAbout;
