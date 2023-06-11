import React, { useEffect, useState } from "react";
import TimePassed from "./timePassed";
import profilePlaceHolder from "../media/icons/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png";
import { manageLike, postComment } from "../services/postServices";
import { useAuth } from "./context/auth.context";
import { Link } from "react-router-dom";
import Comment from "./comments";
import FormInput from "./forminput";
import { useFormik } from "formik";
import joi from "joi";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";

const Post = ({
  post: { postContent, image, created_at, like, comments, _id },
  firstName,
  lastName,
  profileImg,
  user_id,
}) => {
  const { user } = useAuth();
  const [postComments, setPostComments] = useState([]);
  const [commentsShow, setCommentsShow] = useState(false);
  const [liked, setLiked] = useState(like.includes(user._id));
  const [numLikes, setNumLikes] = useState(like.length);

  const schema = {
    comment: joi.string().min(2).max(256).required(),
  };
  const form = useFormik({
    validateOnBlur: false,
    initialValues: {
      comment: "",
    },
    validate: formikValidateUsingJoi(schema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await postComment(_id, values);
        console.log(response.data);
        setPostComments(response.data.comments);
        resetForm();
      } catch ({ response }) {
        if (response && response.status === 400) {
          console.log(response);
        }
      }
    },
  });

  useEffect(() => {
    const setComments = () => {
      setPostComments(comments);
    };
    setComments();
  }, [comments]);

  const handleLike = async () => {
    try {
      const response = await manageLike(_id, liked);
      const updatedLike = response.data.like;
      const updatedNumLikes = updatedLike.length;

      setNumLikes(updatedNumLikes);
      setLiked(!liked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentsShow = () => setCommentsShow(!commentsShow);

  return (
    <div className="container my-5 ">
      <div className="row  justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="mx-auto d-flex bg-light rounded-3 flex-column">
            <div className="me-3 m-3">
              <div className="d-flex justify-content-end my-2">
                <div className="order-3 me-2">
                  <img
                    style={{ width: "30px" }}
                    alt="userImage"
                    src={profileImg || profilePlaceHolder}
                    className="ms-2 rounded-circle"
                  />
                </div>
                <div className="d-flex flex-column align-items-end">
                  <Link
                    to={user_id === user._id ? "/myProfile" : `/user/${user_id}`}
                    className="fw-bolder text-black"
                  >{`${firstName} ${lastName}`}</Link>{" "}
                  <TimePassed created_at={created_at} />
                </div>{" "}
              </div>
            </div>
            <div className="d-flex justify-content-center my-2">
              <p className="">{postContent}</p>
            </div>
            <div className="d-flex justify-content-end my-2">
              {image && (
                <img
                  style={{ maxHeight: "400px", maxWidth: "500px" }}
                  className="w-100 my-2 mx-auto object-fit-scale"
                  src={image}
                  alt="post img"
                />
              )}
            </div>
            <div className="">
              <span className="mx-1">
                {numLikes} <i className="bi bi-heart-fill"></i>
              </span>
              <div className="btn-group mb-2  bg-light">
                <button
                  onClick={handleLike}
                  type="button"
                  className="btn-sm btn-outline-secondary btn"
                >
                  {liked ? (
                    <i className="bi bi-hand-thumbs-up-fill "> unlike</i>
                  ) : (
                    <i className="bi bi-hand-thumbs-up"> like</i>
                  )}
                </button>
                <button
                  onClick={handleCommentsShow}
                  type="button"
                  className="btn-sm btn-outline-secondary btn"
                >
                  <i className="bi bi-chat-left"> comment</i>
                </button>
              </div>
              {commentsShow && (
                <div className="mb-2 mx-1">
                  <form onSubmit={form.handleSubmit}>
                    <div className="mb-1 d-flex">
                      <textarea
                        className="form-control bg-body-secondary border-dark"
                        placeholder="Leave a comment here"
                        style={{ height: "30px", resize: "none", overflow: "hidden" }}
                        name="comment" 
                        value={form.values.comment}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />

                      <button className="btn btn-outline-primary" type="submit">
                        post
                      </button>
                    </div>{" "}
                    {form.errors.comment && <span>{form.errors.comment}</span>}
                  </form>
                  <Comment comments={postComments} setComments={setPostComments} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
