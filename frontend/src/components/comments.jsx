import { getAllUsers, getUser, getUsersInfo } from "../services/useservices";
import React, { useEffect, useState } from "react";
import TimePassed from "./timePassed";
import profilePlaceHolder from "../media/icons/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth.context";

const Comment = ({ comments }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const userIds = comments.map((comment) => comment.user_id);

    const getUsers = async () => {
      const response = await getUsersInfo({ userIds });
      setUsers(response.data);
    };
    getUsers();
  }, [comments]);
  const sortedComments = comments.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      {sortedComments &&
        sortedComments.map((comment) => {
          const commentedUser = users.find((u) => u._id === comment.user_id);
          if (commentedUser) {
            return (
              <div
                key={comment._id}
                className="d-flex flex-column flex-md-row  align-items-center justify-content-center my-2"
              >
                <div className="list-group w-100 ">
                  <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                    <NavLink
                      to={
                        commentedUser._id === user._id
                          ? "/myProfile"
                          : `/user/${commentedUser._id}`
                      }
                    >
                      <img
                        src={commentedUser.profileImg || profilePlaceHolder}
                        alt="profile"
                        width="32"
                        height="32"
                        className="rounded-circle flex-shrink-0"
                      />
                    </NavLink>

                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <Link
                          className="text-black"
                          to={
                            commentedUser._id === user._id
                              ? "/myProfile"
                              : `/user/${commentedUser._id}`
                          }
                        >
                          <h6 className="mb-0 text-black">
                            {commentedUser.firstName} {commentedUser.lastName}
                          </h6>
                        </Link>
                        <p className="mb-0 opacity-75">{comment.comment}</p>
                      </div>
                      <small className="opacity-50 text-nowrap">
                        <TimePassed
                          created_at={comment.created_at}
                        ></TimePassed>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}{" "}
    </>
  );
};
export default Comment;
