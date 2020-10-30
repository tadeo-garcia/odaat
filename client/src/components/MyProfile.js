import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMeetingsByHost, getMeeting } from "../store/meetings";
import {
  getFollowersByCurrentUserId,
  getFollowingByCurrentUserId,
  getUserById,
} from "../store/user";
import { FollowerTable, FollowingTable } from "./FollowTables";
import { baseUrl } from "../config";

export default function Profile() {
  const currentUser = useSelector((state) => state.auth);
  const currentUserUpdated = useSelector((state) => state.users.user);
  const userMeetings = useSelector((state) => state.meetings.hostMeetings);
  const followers = useSelector((state) => state.users.myFollowers);
  const following = useSelector((state) => state.users.imFollowing);

  const [follow, setFollow] = useState("following");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(currentUser.id));
    dispatch(getMeetingsByHost(currentUser.id));
    dispatch(getFollowersByCurrentUserId(currentUser.id));
    dispatch(getFollowingByCurrentUserId(currentUser.id));
  }, [dispatch, currentUser.id]);

  const load = (meetingId) => {
    dispatch(getMeeting(meetingId));
  };

  if (!followers || !following || !currentUserUpdated) return null;
  console.log(baseUrl);
  return (
    <>
      <div id="profile-container">
        <div id="profile-container__top">
          {currentUserUpdated.banner !== null ? (
            <div
              id="profile-container__top-banner"
              style={{
                backgroundImage: `url('${currentUserUpdated.banner}')`,
              }}
            ></div>
          ) : (
            <div id="profile-container__top-default"></div>
          )}
        </div>
        <div id="profile-container__middle">
          <div id="profile-container__middle-upper">
            <div id="profile-container__user-info">
              {currentUser.picture ? (
                <div className="profile-container__pic">
                  <div
                    id="profile-container__avatar"
                    style={{
                      backgroundImage: `url('${currentUserUpdated.picture}')`,
                      borderRadius: "10px",
                    }}
                  ></div>
                </div>
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
                <Link id="button-link" to="/dashboard/EditProfile">
                  {" "}
                  <i className="fa fa-pencil" />
                  edit profile
                </Link>
              </div>
              <div id="button-style">
                <Link id="button-link" to="/dashboard/upload">
                  {" "}
                  <i className="fa fa-picture-o" />
                  update pictures
                </Link>
              </div>
              <div id="button-style">
                <Link
                  id="button-link"
                  to="/dashboard/Profile"
                  onClick={() => {
                    setFollow("followers");
                  }}
                >
                  {" "}
                  <i className="fa fa-users" />
                  followers
                </Link>
              </div>
              <div id="button-style">
                <Link
                  id="button-link"
                  to="/dashboard/Profile"
                  onClick={() => {
                    setFollow("following");
                  }}
                >
                  {" "}
                  <i className="fa fa-users" />
                  following
                </Link>
              </div>
            </div>
          </div>
          <div id="profile-container__middle-lower">
            <div id="profile-container__middle-left">
              <div id="profile-container__bio">
                <h3>about me:</h3>
                <br />
                {currentUser.bio}
              </div>
              <div id="profile-container__interests">
                <h3>some of my interests:</h3>
                <br />
                {currentUser.interests}
              </div>
            </div>
            <div id="profile-container__middle-right">
              <div id="profile-container__events">
                <h3>events i'm hosting:</h3>
                <br />
                {userMeetings ? (
                  <div id="profile-container__events-hosted">
                    {userMeetings.map((meeting, idx) => {
                      let meetClass = "profile-container__event-row";
                      if (idx % 2 === 0) {
                        meetClass = "profile-container__event-row2";
                      }
                      return (
                        <div key={meeting.id} id={meetClass}>
                          <div className="profile-container__event-text">{meeting.title}</div>
                          <div className="profile-container__event-text">{meeting.date}</div>
                          <div className="profile-container__event-text">{meeting.time}</div>
                          <div className="profile-container__event-address">{meeting.location}</div>
                          <div className="">
                            <Link
                              to={`/Dashboard/meetings/${meeting.id}`}
                              onClick={load(meeting.id)}
                            >
                              <i className="fa fa-2x fa-arrow-circle-right" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    It looks like you're not hosting any events yet, check out the host link to the
                    left.
                  </div>
                )}
              </div>
              <div id="profile-container__follow">
                {follow === "followers" ? (
                  <>
                    <h3>followers:</h3>
                    <br />
                    <FollowerTable followers={followers} />
                  </>
                ) : (
                  <>
                    <h3>following:</h3>
                    <br />
                    <FollowingTable following={following} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
