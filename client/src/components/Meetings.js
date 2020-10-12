import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMeetings, getMeeting } from "../store/meetings";

export default function Meetings() {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getMeetings());
  }, [dispatch]);

  const load = (meetingId) => {
    // console.log(meetingId);
    dispatch(getMeeting(meetingId));
  };

  if (!meetings) return null;

  return (
    <>
      <div id="meetings__table-header">
        <div id="meetings__table-header-check">
          Check out any of the meetings below or search above with the map!
        </div>
        <div id="meetings__table-label">
          <div className="meetings-container__text">Name</div>
          <div className="meetings-container__text">Date</div>
          <div className="meetings-container__text">Time</div>
          <div className="meetings-container__text">Address</div>
          <div className="meetings-conatiner__text">More Info</div>
        </div>
      </div>
      <div id="meetings-container">
        <div id="meetings-container__table">
          {meetings.map((meeting, idx) => {
            let meetClass = "meetings-container__meeting";
            if (idx % 2 === 0) {
              meetClass = "meetings-container__meeting2";
            }
            return (
              <div key={meeting.id} id={meetClass}>
                <div id="meetings-container__title" className="meetings-container__text">
                  {meeting.title}
                </div>
                <div className="meetings-container__text">{meeting.date}</div>
                <div className="meetings-container__text">{meeting.time}</div>
                <div className="meetings-container__text">{meeting.location}</div>
                <div className="meetings-container__link">
                  <Link to={`/Dashboard/meetings/${meeting.id}`} onClick={load(meeting.id)}>
                    <i className="fa fa-3x fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
