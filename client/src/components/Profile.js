import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

export default function Profile() {
  const currentUser = useSelector((state) => state.auth);
  console.log(currentUser);
  return (
    <>
      <div id="profile-container">
        <div id="profile-container__top">
          <div id="profile-container__top-banner">Banner goes here.</div>
        </div>
        <div id="profile-container__middle">
          <div id="profile-container__middle-upper">
            <div id="profile-container__user-info">
              {currentUser.pic ? (
                <div
                  className="profile-container__pic"
                  style={{ backgroundImage: `'${currentUser.pic}'` }}
                ></div>
              ) : (
                <div
                  className="profile-container__pic"
                  id="profile-container__default-avatar"
                ></div>
              )}
            </div>
            <div id="profile-container__user-buttons"></div>
          </div>
          <div id="profile-container__middle-lower"></div>
        </div>
      </div>
    </>
  );
}
