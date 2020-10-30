import { baseUrl } from "../config";

const axios = require("axios");

const SET_MESSAGE = "auth/SET_MESSAGE";
const SET_USER = "auth/SET_USER";
const LOGOUT_USER = "auth/LOGOUT_USER";

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    message,
  };
};

export const setUser = (user) => {
  if (!user) {
    return {
      type: SET_USER,
      user: {},
    };
  }
  return {
    type: SET_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    res.data = await res.json();
    if (res.data.user) {
      dispatch(setUser(res.data.user));
    } else {
      dispatch(setUser(res.data.msg));
      return res;
    }
  };
};

export const signup = (email, password, username) => {
  return async (dispatch) => {
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    res.data = await res.json();
    if (res.data.user) {
      dispatch(setUser(res.data.user));
    } else {
      dispatch(setUser(res.data.msg));
      return res;
    }
  };
};

export const updateUserProfile = (
  currentUserId,
  username,
  password,
  confirmPassword,
  bio,
  sobrietyDate,
  displaySobrietyDate,
  interests,
  sponsor,
  sponsee
) => {
  return async (dispatch) => {
    if (password !== confirmPassword) {
      dispatch(setMessage({ msg: "Passwords do not match!" }));
      return;
    }
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: currentUserId,
        username: username ? username : null,
        password: password ? password : null,
        bio: bio ? bio : null,
        sobrietyDate,
        displaySobrietyDate: displaySobrietyDate,
        interests: interests ? interests : null,
        sponsor: sponsor,
        sponsee: sponsee,
      }),
    });
    res.data = await res.json();
    let user = res.data.user;
    let message = res.data.msg;
    console.log(message);
    if (user && message) {
      dispatch(setUser(user));
      dispatch(setMessage(message));
    } else {
      dispatch(setMessage(message));
      return res;
    }
    return res;
  };
};

export const updateProfilePicture = (file, currentUserId) => {
  let formData = new FormData();

  formData.append("id", currentUserId);
  formData.append("file", file.raw);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return async (dispatch) => {
    const res = await axios.put("/api/images/profile_picture", formData, config);
    let user = res.data.user;
    console.log(user);
    if (user) {
      dispatch(setUser(user));
      window.location.href = `${baseUrl}/dashboard/profile`;
    }
    return res;
  };
};

export const updateBannerPicture = (file, currentUserId) => {
  let formData = new FormData();

  formData.append("id", currentUserId);
  formData.append("file", file.raw);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return async (dispatch) => {
    const res = await axios.put("/api/images/banner_picture", formData, config);
    if (res.statusText) {
      dispatch(setUser(res.data.user));
      window.location.href = `${baseUrl}/dashboard/profile`;
    }
    return res;
  };
};

export const logout = () => {
  return async (dispatch) => {
    const res = await fetch("/api/session", {
      method: "DELETE",
      headers: {},
    });
    if (res.ok) {
      dispatch(logoutUser());
    }
    return res;
  };
};

export default function authReducer(state = {}, action) {
  // Object.freeze(state)
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.message };
    case SET_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
