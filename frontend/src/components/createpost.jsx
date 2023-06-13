import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Joi from "joi";
import PageHeader from "./pageHeader";
import { useNavigate } from "react-router-dom";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";
import FormInput from "./forminput";
import { useAuth } from "./context/auth.context";
import { toast } from "react-toastify";
import ImageUpload from "./common/imageUpload";

const CreatePost = () => {
  const [error, setError] = useState("");
  const [base64Image, setBase64Image] = useState("");

  const navigate = useNavigate();
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
      video: Joi.any().allow(""),
 
    }),
    async onSubmit(values) {
      try {
        await createPost({ ...values, image: base64Image });
        toast("your post has been successfully posted 🃏");
        navigate("/");
        setError("");
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
      className="border rounded-lg p-3"
    >
      <PageHeader title="Create a post" />
      {error && (
        <div className="alert-danger alert text-center">{error}</div>
      )}{" "}
      <div className="mb-1">
        <textarea
          rows={7}
          placeholder={"what's on your mind?"}
          value={form.values.postContent}
          className={["form-control", form.errors.postContent && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
          {...form.getFieldProps("postContent")}
        />
        <span style={{ color: "red" }}>{form.errors.postContent}</span>
      </div>
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
    </form>
  );
};

export default CreatePost;
