import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Joi from "joi";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";
import { useAuth } from "./context/auth.context";
import { toast } from "react-toastify";
import ImageUpload from "./common/imageUpload";

const MiniCreatePost = ({ setPosts }) => {
  const [error, setError] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const { createPost } = useAuth();

  const form = useFormik({
    validateOnBlur: false,
    initialValues: {
      postContent: "",
      image: "",
    },
    validate: formikValidateUsingJoi({
      postContent: Joi.string().required(),
      image: Joi.any().allow(""),
    }),
    async onSubmit(values, { resetForm }) {
      try {
        const response = await createPost({ ...values, image: base64Image });
        const newPost = {
          ...response.data,
        };
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setBase64Image(null);
        toast("your post has been successfully posted 🃏");
        setError("");
        resetForm();
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit}
      autoComplete="off"
      className="border rounded-lg"
    >
      {error && <div className="alert-danger alert text-center">{error}</div>}{" "}
      <div className="mb-1 mt-3">
        <input
          placeholder={"what's on your mind?"}
          value={form.values.postContent}
          className="form-control"
          {...form.getFieldProps("postContent")}
        />
        <div className="d-flex">
        <div className="flex-grow-1">
          <button className="btn m-0 btn-outline-dark w-100" type="submit">
            Post
          </button>
        </div>
          <div className="flex-shrink-0">
            <ImageUpload
              image={base64Image}
              setImage={setBase64Image}
              label={"image"}
              error={form.errors.image}
              {...form.getFieldProps("image")}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default MiniCreatePost;
