import { useContext, createContext, useState } from "react";
import userServices, { getUserToken } from "../../services/useservices";
import postServices from "../../services/postServices";

const authContext = createContext(null);

authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserToken());

  const refreshUser = () => setUser(getUserToken());

  const logIn = async (credentials) => {
    const response = await userServices.logInUser(credentials);
    refreshUser();

    return response;
  };

  const logOut = () => {
    userServices.logOut();
    refreshUser();
  };

  return (
    <>
      <authContext.Provider
        value={{
          logIn,
          logOut,
          user,
          createUser: userServices.signUp,
          createPost: postServices.createPost,
        }}
      >
        {children}
      </authContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
