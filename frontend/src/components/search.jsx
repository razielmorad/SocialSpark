import React, { useState } from "react";
import GetAllUsers from "./common/getAllUsers";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const users = GetAllUsers();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = () => {
    setSearchTerm("");
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" mt-4 ms-5">
      <div className="">
        <div className="">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for users..."
          />
          <ul className="list-group mt-3 position-fixed">
            {searchTerm !== "" &&
              filteredUsers.map((user, index) => (
                <Link 
                  key={index}
                  className="list-group-item cursor-pointer hover-shadow"
                  to={`/user/${user._id}`}
                  onClick={handleUserClick}
                >
                  {user.firstName} {user.lastName}
                </Link>
              ))}
          </ul>
          {searchTerm !== "" && filteredUsers.length === 0 && (
            <p className="text-center mt-3 position-fixed">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
