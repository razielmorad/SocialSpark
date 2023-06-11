import { useEffect, useState } from "react";
import { getMyUser } from "../../services/useservices";

const GetMyUser = () => {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const getUserDetails = async () => {
      const response = await getMyUser();
      setUserDetails(response.data);
    };
    getUserDetails();
  }, []);
  return userDetails;
};
export default GetMyUser;
