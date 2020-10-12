import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getMeetingsByHost, getMeeting } from "../store/meetings";

export default function Profile() {
  const currentUser = useSelector((state) => state.auth);
  const userMeetings = useSelector((state) => state.meetings.hostMeetings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeetingsByHost(currentUser.id));
  }, [dispatch]);

  const load = (meetingId) => {
    // console.log(meetingId);
    dispatch(getMeeting(meetingId));
  };

  if (!userMeetings) return null;

  return (
    <>
      <div id="profile-container">
        <div id="profile-container__top">
          <div id="profile-container__top-banner"></div>
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
              <div id="button-style">
                <Link id="button-link" exact to="/dashboard/settings">
                  {" "}
                  <i className="fa fa-users" />
                  followers
                </Link>
              </div>
              <div id="button-style">
                <Link id="button-link" exact to="/dashboard/settings">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
