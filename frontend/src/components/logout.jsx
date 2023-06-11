import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth.context";

const SignOut = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logOut();
    navigate("/ulHome");
  },[]);
};
export default SignOut;
