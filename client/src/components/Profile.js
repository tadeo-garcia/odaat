import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getMeetingsByHost } from "../store/meetings";

export default function Profile() {
  const currentUser = useSelector((state) => state.auth);
  const userMeetings = useSelector((state) => state.meetings.hostMeetings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeetingsByHost(currentUser.id));
  }, [dispatch]);

  if (!userMeetings) return null;

  console.log(userMeetings);

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
              <div id="profile-container__user-details">
                <span id="profile-title">Welcome {currentUser.username}</span>
                <div>
                  {currentUser.sobriety_date ? `Sobriety date: ${currentUser.sobriety_date}` : null}
                </div>
              </div>
            </div>
            <div id="profile-container__user-buttons">
              <div id="button-style">
                <Link id="button-link" exact to="/dashboard/settings">
                  {" "}
                  <i className="fa fa-pencil" />
                  edit profile
                </Link>
              </div>
              <div id="button-style">
                <Link id="button-link" exact to="/dashboard/settings">
                  {" "}
                  <i className="fa fa-picture-o" />
                  update banner
                </Link>
              </div>
            </div>
          </div>
          <div id="profile-container__middle-lower">
            <div id="profile-container__middle-left">
              <div id="profile-container__bio">
                <h3>About me:</h3>
                <br />
                {currentUser.bio}
              </div>
              <div id="profile-container__interests">
                <h3>Some of my interests:</h3>
                <br />
                {currentUser.interests}
              </div>
            </div>
            <div id="profile-container__middle-right">
              <div id="profile-container__events">
                <h3>Events I'm hosting:</h3>
                <br />
                {currentUser.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
