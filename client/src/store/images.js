const axios = require("axios");

const SET_PROFILE_PIC = "images/profile_image";
const SET_BANNER_PIC = "images/banner_image";

export const setProfile = (image) => {
  return {
    type: SET_PROFILE_PIC,
    image,
  };
};

export const setBanner = (image) => {
  return {
    type: SET_BANNER_PIC,
    image,
  };
};

export const postProfileImage = (file) => {
  let formData = new FormData();

  formData.append("file", file.raw);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return async (dispatch) => {
    const res = await axios.post("/api/images/profile_picture", formData, config);
    if (res.statusText) {
      dispatch(setProfile(res.data.file));
    }
    return res;
  };
};

export const postBannerImage = (file) => {
  let formData = new FormData();

  formData.append("file", file.raw);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return async (dispatch) => {
    const res = await axios.post("/api/images/banner_picture", formData, config);
    if (res.statusText) {
      dispatch(setBanner(res.data.file));
    }
    return res;
  };
};

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE_PIC:
      return { ...state, file: action.file };
    case SET_BANNER_PIC:
      return { ...state, file: action.file };
    default:
      return state;
  }
}
