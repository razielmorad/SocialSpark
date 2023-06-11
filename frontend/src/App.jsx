import React from "react";
import "./style/App.css";
import "./style/app2.css";
import NavBar from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/home";
import LogIn from "./components/login";
import Footer from "./components/footer";
import SignUp from "./components/signup";
import About from "./components/about";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignOut from "./components/logout";
import CreatePost from "./components/createpost";
import UnLoggedHome from "./components/unLoggedHome";
import ProtectedRoute from "./components/common/portectedRoute";
import MyProfile from "./components/myProfile";
import UsersProfile from "./components/usersProfile";
import Favorites from "./components/favorites";
import ContactPage from "./components/contact";
import UlAbout from "./components/ulAbout";
import { useAuth } from "./components/context/auth.context";

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const signUpAndIn = ["/signup", "/signin", "/ulHome","/ulAbout"].includes(
    location.pathname
  );
  const includeHome = ["/"].includes(location.pathname);

  return (
    <div className="App d-flex flex-column min-vh-100 bg-secondary bg-opacity-25">
      <ToastContainer />
      {!signUpAndIn && (
        <header>
          <NavBar></NavBar>
        </header>
      )}

      <main className="container flex-fill">
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <>
                  <Home />
                </>

                {!includeHome && <Home />}
              </ProtectedRoute>
            }
            path={"/"}
          />

          <Route element={<About />} path={"/about"} />
          <Route element={<Favorites />} path={"/likedPosts"} />
         
          <Route element={<SignOut />} path={"/signout"} />
          <Route element={<SignOut />} path="/signout" />
          <Route element={<ContactPage />} path="/contactUs" />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <UsersProfile />
              </ProtectedRoute>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <CreatePost />{" "}
              </ProtectedRoute>
            }
            path="/post"
          />
          <Route
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
            path="/myProfile"
          />
        </Routes>
      </main>
      <div className="bg-dark">
        <Routes>
        <Route element={<LogIn />} path={"/signin"} />
          <Route element={<SignUp />} path={"/signup"} />
          <Route element={<UnLoggedHome />} path="/ulHome" />
          <Route element={<UlAbout/>} path="/ulAbout" />
        </Routes>
      </div>

      {!signUpAndIn && !includeHome && (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </div>
  );
}

export default App;
