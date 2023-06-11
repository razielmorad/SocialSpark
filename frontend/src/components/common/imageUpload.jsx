import React, { useState } from "react";
import Joi from "joi";

function ImageUpload({ image, setImage, error, label, ...rest }) {
  function convertToBase64(e) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const schema = Joi.string()
      .valid(...allowedExtensions)
      .messages({
        "any.only": "You must upload only an image file",
      });

    const { error } = schema.validate(fileExtension);

    if (error) {
      setImage("");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  function removeImage() {
    setImage("");
  }

  return (
    <>
      <label htmlFor="image" className="btn btn-outline-dark m-0">
        <i className="bi bi-image-fill"></i>
      </label>

      <input
        {...rest}
        name={label}
        placeholder={label}
        className={[error && "is-invalid"].filter(Boolean).join(" ")}
        type="file"
        accept="image/jpeg, image/png, image/gif"
        onChange={convertToBase64}
        id="image"
        style={{ visibility: "hidden" }}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
      <br />

      {image && (
        <div>
          <img width={80} height={65} src={image} alt="postImage" />
          <button className="btn btn-danger" onClick={removeImage}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default ImageUpload;
