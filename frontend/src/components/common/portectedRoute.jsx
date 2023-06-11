import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/ulHome"} />;
  }
  return children;
};
export default ProtectedRoute;
