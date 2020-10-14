const GET_USER_BY_ID = "user/user";
const GET_FOLLOWERS_BY_ID = "user/followers";
const GET_FOLLOWING_BY_ID = "user/following";

export const loadUserById = (user) => {
  return {
    type: GET_USER_BY_ID,
    user: user,
  };
};

export const loadFollowersById = (followers) => {
  return {
    type: GET_FOLLOWERS_BY_ID,
    followers: followers,
  };
};

export const loadFollowingById = (following) => {
  return {
    type: GET_FOLLOWING_BY_ID,
    following: following,
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    console.log(id);
    const res = await fetch(`/api/user/user_by_id?id=${id}`, { method: "GET" });
    console.log(res);
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadUserById(res.data.user));
    }
    return res;
  };
};

export const getFollowersById = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/user/followers_by_id?id=${id}`, { method: "GET" });
    console.log(res);
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadFollowersById(res.data.followers));
    }
    return res;
  };
};

export const getFollowingById = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/user/following_by_id?id=${id}`, { method: "GET" });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadFollowingById(res.data.following));
    }
    return res;
  };
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_BY_ID:
      return { ...state, user: action.user };
    case GET_FOLLOWERS_BY_ID:
      return { ...state, followers: action.followers };
    case GET_FOLLOWING_BY_ID:
      return { ...state, following: action.following };
    default:
      return state;
  }
}
