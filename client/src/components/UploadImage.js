import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div id="upload__profile-image">
        <label>
          Change Profile Picture
          <input type="file" onChange={handleProfileImage} />
        </label>
        <button onClick={handlePostPicture}>
          {" "}
          <i className="fa fa-pencil" />
          Edit Profile
        </button>
      </div>
      <div id="upload__banner-image">
        {" "}
        <label>
          Change Profile Picture
          <input type="file" onChange={handleBannerImage} />
        </label>
        <button onClick={handlePostPicture}>
          {" "}
          <i className="fa fa-pencil" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
