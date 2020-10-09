import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../store/meetings";

export default function Meetings() {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);

  useEffect(() => {
    dispatch(getMeetings());
  }, [dispatch]);

  if (!meetings) return null;

  return (
    <>
      <div id="meetings-container">
        <div id="meetings-container__header">
          <span>Check out any of the meetings below, or search above with the map!</span>
        </div>
        <div id="meetings-container__grid">
          {meetings.map((meeting) => {
            return (
              <div key={meeting.id} id="meetings-container__meeting">
                <div>{meeting.title}</div>
                <div>{meeting.date}</div>
                <div>{meeting.time}</div>
                <div>{meeting.location}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
