import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { getMeetingsByHost, getMeeting } from "../store/meetings";
import {
  getFollowersById,
  getFollowingById,
  getUserById,
  followUser,
  unfollowUser,
} from "../store/user";
import { FollowerTable, FollowingTable } from "./FollowTables";

export default function UserProfile() {
  const currentUser = useSelector((state) => state.auth);
  const profileUser = useSelector((state) => state.users.user);
  const userMeetings = useSelector((state) => state.meetings.hostMeetings);
  const followers = useSelector((state) => state.users.followers);
  const following = useSelector((state) => state.users.following);
  let params = useParams();
  let profileId = params.id;

  const [follow, setFollow] = useState("following");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(profileId));
    dispatch(getMeetingsByHost(profileId));
    dispatch(getFollowersById(profileId));
    dispatch(getFollowingById(profileId));
  }, [dispatch, profileId]);

  const load = (meetingId) => {
    dispatch(getMeeting(meetingId));
  };

  const handleFollowUser = (id1, id2) => {
    dispatch(followUser(currentUser.id, profileUser.id));
    dispatch(getFollowersById(profileId));
    dispatch(getFollowingById(profileId));
  };

  const handleUnfollowUser = (id1, id2) => {
    dispatch(unfollowUser(currentUser.id, profileUser.id));
    dispatch(getFollowersById(profileId));
    dispatch(getFollowingById(profileId));
  };

  // if (!userMeetings) return null;
  if (!followers || !following) return null;
  if (!profileUser) return null;

  return (
    <>
      <div id="profile-container">
        <div id="profile-container__top">
          <div id="profile-container__top-banner"></div>
        </div>
        <div id="profile-container__middle">
          <div id="profile-container__middle-upper">
            <div id="profile-container__user-info">
              {profileUser.pic ? (
                <div
                  className="profile-container__pic"
                  style={{ backgroundImage: `'${profileUser.pic}'` }}
                ></div>
              ) : (
                <div
                  className="profile-container__pic"
                  id="profile-container__default-avatar"
                ></div>
              )}
              <div id="profile-container__user-details">
                <span id="profile-title">{profileUser.username}'s Profile</span>
                <div>
                  {profileUser.sobriety_date ? `Sobriety date: ${profileUser.sobriety_date}` : null}
                </div>
              </div>
            </div>
            <div id="profile-container__user-buttons">
              <div id="button-style">
                <Link id="button-link" onClick={handleFollowUser} to={`/dashboard/profile`}>
                  {" "}
                  <i className="fa fa-user-circle-o" />
                  follow
                </Link>
              </div>
              <div id="button-style">
                <Link id="button-link" onClick={handleUnfollowUser} to={`/dashboard/profile}`}>
                  {" "}
                  <i className="fa fa-ban" />
                  unfollow
                </Link>
              </div>
              <div id="button-style">
                <Link
                  id="button-link"
                  to={`/dashboard/profile/${profileUser.id}`}
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
                  to={`/dashboard/profile/${profileUser.id}`}
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
                <h3>about them:</h3>
                <br />
                {profileUser.bio}
              </div>
              <div id="profile-container__interests">
                <h3>some of their interests:</h3>
                <br />
                {profileUser.interests}
              </div>
            </div>
            <div id="profile-container__middle-right">
              <div id="profile-container__events">
                <h3>events they're hosting:</h3>
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
