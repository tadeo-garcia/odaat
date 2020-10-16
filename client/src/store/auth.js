const SET_ERROR = "auth/SET_ERROR";
const SET_USER = "auth/SET_USER";
const LOGOUT_USER = "auth/LOGOUT_USER";

export const setError = (message) => {
  return {
    type: SET_ERROR,
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
  bio,
  sobrietyDate,
  displaySobrietyDate,
  interests,
  sponsor,
  sponsee
) => {
  return async (dispatch) => {
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
        sobrietyDate: sobrietyDate ? sobrietyDate : null,
        displaySobrietyDate: displaySobrietyDate,
        interests: interests ? interests : null,
        sponsor: sponsor,
        sponsee: sponsee,
      }),
    });
    res.data = await res.json();
    let user = res.data.user;
    let message = res.data.msg;
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setError(message));
      console.log(message);
      return res;
    }
    return console.log("good to go");
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
    case SET_ERROR:
      return { ...state, message: action.message };
    case SET_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
