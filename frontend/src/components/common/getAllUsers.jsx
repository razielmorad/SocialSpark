import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/useservices";

const GetAllUsers = () => {
  const [usersDetails, setUsersDetails] = useState([]);
  useEffect(() => {
    const getUsersDetails = async () => {
      const response = await getAllUsers();
      setUsersDetails(response.data);
    };
    getUsersDetails();
  }, []);
  return usersDetails;
};
export default GetAllUsers;
