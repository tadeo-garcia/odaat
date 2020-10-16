const GET_USER_BY_ID = "user/user";
const SET_FOLLOWERS_BY_ID = "user/followers";
const SET_FOLLOWING_BY_ID = "user/following";
const GET_FOLLOWERS_BY_CURRENT_USER_ID = "user/myfollowers";
const GET_FOLLOWING_BY_CURRENT_USER_ID = "user/imfollowing";

export const loadUserById = (profileUser) => {
  return {
    type: GET_USER_BY_ID,
    user: profileUser,
  };
};

export const loadFollowUser = (followers) => {
  return {
    type: SET_FOLLOWERS_BY_ID,
    followers: followers,
  };
};

export const loadUnfollowUser = (followers) => {
  return {
    type: SET_FOLLOWERS_BY_ID,
    followers: followers,
  };
};

export const loadFollowersByCurrentUserId = (myFollowers) => {
  return {
    type: GET_FOLLOWERS_BY_CURRENT_USER_ID,
    myFollowers: myFollowers,
  };
};

export const loadFollowingByCurrentUserId = (imFollowing) => {
  return {
    type: GET_FOLLOWING_BY_CURRENT_USER_ID,
    imFollowing: imFollowing,
  };
};

export const loadFollowersById = (followers) => {
  return {
    type: SET_FOLLOWERS_BY_ID,
    followers: followers,
  };
};

export const loadFollowingById = (following) => {
  return {
    type: SET_FOLLOWING_BY_ID,
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
      dispatch(loadFollowUser(res.data.followers));
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
      dispatch(loadUnfollowUser(res.data.followers));
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

export const getFollowersByCurrentUserId = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/user/followers_by_id?id=${id}`, { method: "GET" });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadFollowersByCurrentUserId(res.data.followers));
    }
    return res;
  };
};

export const getFollowingByCurrentUserId = (id) => {
  return async (dispatch) => {
    const res = await fetch(`/api/user/following_by_id?id=${id}`, { method: "GET" });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadFollowingByCurrentUserId(res.data.following));
    }
    return res;
  };
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_BY_ID:
      return { ...state, user: action.user };
    case GET_FOLLOWERS_BY_CURRENT_USER_ID:
      return { ...state, myFollowers: action.myFollowers };
    case GET_FOLLOWING_BY_CURRENT_USER_ID:
      return { ...state, imFollowing: action.imFollowing };
    case SET_FOLLOWERS_BY_ID:
      return { ...state, followers: action.followers };
    case SET_FOLLOWING_BY_ID:
      return { ...state, following: action.following };
    default:
      return state;
  }
}
