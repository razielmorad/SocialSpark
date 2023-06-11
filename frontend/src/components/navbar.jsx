import { Link, NavLink } from "react-router-dom";

import { useAuth } from "./context/auth.context";
import profilePlaceHolder from "../media/icons/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png";
import Search from "./search";
import { useEffect, useState } from "react";
import { getMyUser, getUserInfo } from "../services/useservices";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const response = await getMyUser();
        setUserDetails(response.data);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <nav className="px-3 py-2 background-blue w-100 mb-auto nav ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to={user ? "/" : "/ulHome"}
              className="d-flex justify-content-center align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <h3 className="app-heading px-3">
                Social <i className="bi bi-chat-left-text-fill"></i> Spark
              </h3>{" "}
            </Link>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <NavLink to="/" className="nav-link text-white">
                  <i className="  bi bi-house d-block mx-auto mb-1"></i>
                  <span className="">Home</span>
                </NavLink>
              </li>{" "}
              {user && (
                <>
                  {" "}
                  <li>
                    <NavLink to="/likedPosts" className="nav-link text-white">
                      <i className=" bi bi-star-fill d-block mx-auto mb-1"></i>
                      <span className="">favorites</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/post" className="nav-link text-white">
                      <i className=" bi bi-columns-gap d-block mx-auto mb-1"></i>
                      <span className="">post</span>
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to={"/about"} className="nav-link text-white">
                  <i className="  bi bi-info-circle d-block mx-auto mb-1"></i>
                  <span className="">About</span>
                </NavLink>
              </li>{" "}
              <li>
                <NavLink to={"/contactUs"} className="nav-link text-white">
                  <i className="  bi bi-info-circle d-block mx-auto mb-1"></i>
                  <span className="">contact</span>
                </NavLink>
              </li>{" "}
              {user && (
                <li className="me-5 align-self-start">
                  <Search />
                </li>
              )}
            </ul>{" "}
            {user && (
              <li className="nav-item dropdown">
                <a
                  href="/"
                  className=" d-block link-body-emphasis text-decoration-none dropdown-toggle ms-2 mt-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    style={{ width: "25px", height: "25px" }}
                    src={userDetails.profileImg || profilePlaceHolder}
                    alt="mdo"
                    className="rounded-circle d-block mx-auto mb-1"
                  />
                </a>
                <ul className="dropdown-menu">
                  <li className="d-flex background-blue text-light justify-content-center">
                    {userDetails.firstName} {userDetails.lastName}
                  </li>
                  <hr className="dropdown-divider" />
                  <li>
                    <Link className="dropdown-item" to="/MyProfile">
                      My Profile
                    </Link>
                  </li>
                  <li></li>
                  <li>
                    <Link className="dropdown-item" to="/signout">
                      Sign out
                    </Link>
                  </li>
                </ul>
              </li>
            )}{" "}
            <div className="px-3 py-2 d-flex justify-content-end">
              {!user && (
                <div className="text-end">
                  <Link to={"/signin"}>
                    <button
                      type="button"
                      className="btn btn-outline-warning text-dark me-2"
                    >
                      sign-in
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button
                      type="button"
                      className="btn btn-outline-warning text-dark me-2"
                    >
                      Sign-up
                    </button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="text-end">
                  <Link to={"/signout"}>
                    <button
                      type="button"
                      className="btn btn-outline-warning text-dark"
                    >
                      log-out
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
