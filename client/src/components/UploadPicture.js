import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture, updateBannerPicture } from "../store/auth";

export default function HomePage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const currentUserId = useSelector((state) => state.auth.id);

  const handlePostFile = () => {
    dispatch(postFile(file, currentUserId));
  };

  const handleFileChange = (e) => {
    setFile({
      raw: e.target.files[0],
    });
  };

  return (
    <>
      <label>
        File Upload
        <input type="file" onChange={handleFileChange} />
      </label>
      <button onClick={handlePostFile}>Create File</button>
    </>
  );
}
