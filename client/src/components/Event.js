import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../store/meetings";
import MapApi from "./Map";

export default function Event() {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getMeetings());
  }, [dispatch]);

  if (!meetings) return null;

  return (
    <>
      <div id="meetings-container">
        <MapApi></MapApi>
        <div id="meetings-container__header">
          <span>CURRENT MEETING TITLE</span>
        </div>
        <div id="meetings-container__grid">
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}