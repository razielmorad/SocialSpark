import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/useservices";

const GetUser = (user_id) => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        console.log(user_id);
        const response = await getUserInfo(user_id);
        console.log(response);
        setUserDetails(response.data);
      } catch (err) {
        setUserDetails(err.response.data);
      }
    };

    getUserDetails();
  }, []);

  return userDetails;
};

export default GetUser;
