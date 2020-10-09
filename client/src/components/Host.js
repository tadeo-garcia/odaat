import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeeting } from "../store/meetings";

export default function Host() {
  // const currentUserId =
  // const [title, setTitle] = useState(
  //   "Enter a Title for your meeting. An example could be Liberty Group Meeting."
  // );
  // const [description, setDescription] = useState(
  //   "Set a description for your meeeting. Here you can specify if it is a closed meeting, or what language it is, and so on."
  // );
  // const [date, setDate] = useState("Choose a Date for your meeting.");
  // const [time, setTime] = useState(
  //   "Choose a starting time for your meeting, please use the format 00:00, and military time."
  // );
  // const [location, setLocation] = useState("Please enter an address for your meeting.");
  // const [virtual, setVirtual] = useState(false);
  // const [zoomId, setZoomId] = useState("Please enter the zoom id here if it is a virtual meeting.");
  // const [official, setOfficial] = useState(true);

  // const dispatch = useDispatch();

  return (
    <>
      <div id="host-container">
        <div id="host-container__info">Here is a form where you can host your own meeting.</div>
        <div>
          {/* <form id="host-container__form">
            <div id="host-container__input">
              <input type="text" onChange={(e) => setTitle(e.target.value)}>
                {title}
              </input>
            </div>
            <div id="host-container__input">
              <input type="text" onChange={(e) => setLocation(e.target.value)}>
                {location}
              </input>
            </div>
          </form> */}
        </div>
      </div>
    </>
  );
}
