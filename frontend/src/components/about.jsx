import userProfile from "../media/images/3135715.png";
import mobile from "../media/images/modern-portfolio-devices.png";
import newsFeed from "../media/images/coffee-1869772_1280.jpg";
import search from "../media/images/search-2951638_1280.jpg";
import interactions from "../media/images/handshake-3139227_1280.jpg";
import profiles from "../media/images/profiles.jpg";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-2">
          <div className="col-12 mt-4 text-center">
            <h1 className="display-4">
              Social<span className="text-primary">S</span>park - About Us
            </h1>
            <p className="lead text-muted">
              A social networking platform connecting people worldwide.
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-4">
            <img
              src={userProfile}
              alt="userProfile"
              className="bd-placeholder-img rounded-circle "
              width="140"
              height="140"
            ></img>
            <h2 className="fw-normal">User Profiles</h2>
            <p>
              Create a personalized profile to showcase your interests, hobbies,
              and information.
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
            <h2 className="fw-normal">News Feed</h2>
            <p>
              Stay up to date with the latest posts, photos, and events shared
              by your network.
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
            <h2 className="fw-normal">Search and Discovery</h2>
            <p>
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
            <h2 className="fw-normal">User Interactions</h2>
            <p>
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
            <h2 className="fw-normal">Profiles</h2>
            <p>
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
            <h2 className="fw-normal">Mobile Accessibility</h2>
            <p>
              Access our social network on the go through our mobile
              application.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
