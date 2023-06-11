import React, { useState, useEffect, useRef } from "react";

import Joi from "joi";
import { deleteUserProfileImg, getMyUser } from "../../services/useservices";
import { setUserProfileImg } from "../../services/useservices";
import GetMyUser from "./getMyUser";

function ProfileImageUpload() {
  const [error, setError] = useState(null);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [sentImage, setSentImage] = useState(false);
  const user = GetMyUser();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const setUserImage = () => {
      if (user?.profileImg) {
        setImageUrl(user.profileImg);
      }
    };
    setUserImage();
  }, [user]);
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
      setError(error);
    } else {
      setError(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error", error);
      };
    }
  }

  async function removeImage() {
    try {
      await deleteUserProfileImg();
      setImage(null);
      setSentImage(false);
      setImageUrl(null);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <div>
        {image || imageUrl ? (
          <div>
            <img
              key={image}
              src={image || imageUrl}
              className="icon-container profile-image"
              alt="Profile"
            />
            <button className="my-2 btn btn-danger" onClick={removeImage}>
              <i className="bi bi-trash"></i>
            </button>
            {!imageUrl && !sentImage && (
              <button
                className="btn btn-success"
                onClick={() => {
                  try {
                    setUserProfileImg({ profileImg: image });
                    setSentImage(true);
                    window.location.reload(false);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                <i className="bi bi-check-circle-fill"></i>
              </button>
            )}
          </div>
        ) : (
          <>
            <label htmlFor="image-upload">
              <div className="icon-container profile-image">
                <i className="bi bi-person-circle"></i>
                <span className="">choose a profile picture</span>
              </div>{" "}
            </label>
          </>
        )}
      </div>

      <input
        className="visually-hidden"
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={convertToBase64}
      />

      {error && <span style={{ color: "red" }}>{error.message}</span>}
    </>
  );
}

export default ProfileImageUpload;
