import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProfilePicture, updateBannerPicture } from "../store/auth";

export default function UploadImage() {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const currentUserId = useSelector((state) => state.auth.id);

  const handlePostPicture = () => {
    if (profileImage !== null && bannerImage !== null) {
      dispatch(updateProfilePicture(profileImage, currentUserId));
      dispatch(updateBannerPicture(bannerImage, currentUserId));
    } else if (profileImage === null && bannerImage !== null) {
      dispatch(updateBannerPicture(bannerImage, currentUserId));
    } else if (profileImage !== null && bannerImage === null) {
      dispatch(updateProfilePicture(profileImage, currentUserId));
    } else {
      return alert("You must upload a file before pressing submit!");
    }
  };

  const handleProfileImage = (e) => {
    setProfileImage({
      raw: e.target.files[0],
    });
  };

  const handleBannerImage = (e) => {
    setProfileImage({
      raw: e.target.files[0],
    });
  };

  return (
    <div id="upload__container">
      <div className="upload__image">
        <span id="upload__span">Change Profile Picture</span>
        <input id="upload__input" type="file" onChange={handleProfileImage} />
        <button id="upload__button" onClick={handlePostPicture}>
          Submit
        </button>
      </div>
      <div className="upload__image">
        <span id="upload__span"> Change Banner Picture</span>
        <input type="file" id="upload__input" onChange={handleBannerImage} />
        <button id="upload__button" onClick={handlePostPicture}>
          Submit
        </button>
      </div>
    </div>
  );
}
