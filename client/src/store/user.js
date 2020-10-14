const GET_USER_BY_ID = "user/user";
const UNFOLLOW_USER = "user/following";
const FOLLOW_USER = "user/following";
const GET_FOLLOWERS_BY_ID = "user/followers";
const GET_FOLLOWING_BY_ID = "user/following";

export const loadUserById = (user) => {
  return {
    type: GET_USER_BY_ID,
    user: user,
  };
};

export const loadFollowUser = (following) => {
  return {
    type: FOLLOW_USER,
    following: following,
  };
};

export const loadUnfollowUser = (following) => {
  return {
    type: UNFOLLOW_USER,
    following: following,
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
    const res = await fetch(`/api/user/user_by_id?id=${id}`, { method: "GET" });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadUserById(res.data.user));
    }
    return res;
  };
};

export const followUser = (currentUserId, profileId) => {
  return async (dispatch) => {
    const res = await fetch(
      `/api/user/follow_by_id?current_user_id=${currentUserId}&profile_id=${profileId}`,
      { method: "GET" }
    );
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadFollowUser(res.data.following));
    }
    return res;
  };
};

export const unfollowUser = (currentUserId, profileId) => {
  return async (dispatch) => {
    console.log(currentUserId);
    console.log(profileId);
    const res = await fetch(
      `/api/user/unfollow_by_id?current_user_id=${currentUserId}&profile_id=${profileId}`,
      { method: "GET" }
    );
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadUnfollowUser(res.data.following));
    }
    return res;
  };
};

export const getFollowersById = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/user/followers_by_id?id=${id}`, { method: "GET" });
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
    case FOLLOW_USER:
      return { ...state, following: action.following };
    case UNFOLLOW_USER:
      return { ...state, following: action.following };
    case GET_FOLLOWERS_BY_ID:
      return { ...state, followers: action.followers };
    case GET_FOLLOWING_BY_ID:
      return { ...state, following: action.following };
    default:
      return state;
  }
}
