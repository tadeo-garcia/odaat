const SET_PROFILE_PIC = "images/profile_image";
const SET_BANNER_PIC = "images/banner_image";

export const setProfilePicture = (profilePic) => {
  return {
    type: SET_PROFILE_PIC,
    profilePic,
  };
};

export const setBannerPicture = (bannerPic) => {
  return {
    type: SET_BANNER_PIC,
    bannerPic,
  };
};

export const loadProfileImage = (currentUserId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/images/profile_picture/${currentUserId}`);
    res.data = await res.json();
    let profilePicture = res.data.profile;
    if (profilePicture) {
      dispatch(setProfilePicture(profilePicture));
    }
    return res;
  };
};
export const loadBannerImage = (currentUserId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/images/banner_picture/${currentUserId}`);
    res.data = await res.json();
    let bannerPicture = res.data.banner;
    if (bannerPicture) {
      dispatch(setBannerPicture(bannerPicture));
    }
    return res;
  };
};

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE_PIC:
      return { ...state, images: action.profilePic };
    case SET_BANNER_PIC:
      return { ...state, images: action.bannerPic };
    default:
      return state;
  }
}
