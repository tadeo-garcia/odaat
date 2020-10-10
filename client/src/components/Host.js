import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeeting } from "../store/meetings";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import MapApi from "./Map";

export default function Host() {
  const currentUserId = useSelector((state) => state.auth.id);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState("Choose a Date for your meeting.");
  const [time, setTime] = useState(
    "Choose a starting time for your meeting, please use the format 00:00, and military time."
  );
  const [location, setLocation] = useState("Please enter an address for your meeting.");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [virtual, setVirtual] = useState("off");
  const [zoomId, setZoomId] = useState("Please enter the zoom id here if it is a virtual meeting.");
  const [official, setOfficial] = useState("off");

  const dispatch = useDispatch();

  const extractCoord = async () => {
    let address = location;
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(`${lat} , ${lng}`);
      setLat(lat);
      setLng(lng);
      console.log({
        currentUserId,
        title,
        location,
        description,
        date,
        time,
        lat,
        lng,
        virtual,
        zoomId,
        official,
      });

      dispatch(
        createMeeting(
          currentUserId,
          title,
          location,
          description,
          date,
          time,
          lat,
          lng,
          virtual,
          zoomId,
          official
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateMeeting = () => {
    extractCoord();

    // console.log({
    //   currentUserId,
    //   title,
    //   location,
    //   description,
    //   date,
    //   time,
    //   lat,
    //   lng,
    //   virtual,
    //   zoomId,
    //   official,
    // });
    // dispatch(
    //   createMeeting(
    //     currentUserId,
    //     title,
    //     location,
    //     description,
    //     date,
    //     time,
    //     lat,
    //     lng,
    //     virtual,
    //     zoomId,
    //     official
    //   )
    // );
  };

  return (
    <>
      <div id="host-wrapper">
        <div className="hidden">
          <MapApi />
        </div>
        <div id="host-container">
          <div id="host-container__info">Here is a form where you can host your own meeting.</div>
          <div>
            <form id="host-container__form">
              <div id="host-container__input">
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    "Enter a Title for your meeting. An example could be Liberty Group Meeting."
                  }
                />
              </div>
              <div id="host-container__input">
                <input type="text" onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div id="host-container__input">
                <input
                  type="text-area"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Set a description for your meeeting. Here you can specify if it is a closed meeting, or what language it is, and so on."
                />
              </div>
              <div id="host-container__input">
                <input type="date" onChange={(e) => setDate(e.target.value)} />
              </div>
              <div id="host-container__input">
                <input type="time" onChange={(e) => setTime(e.target.value)} />
              </div>
              <div id="host-container__input">
                <input type="checkbox" onClick={(e) => setVirtual(e.target.value)} />
              </div>
              <div id="host-container__input">
                <input type="checkbox" onClick={(e) => setOfficial(e.target.value)} />
              </div>
              <div id="host-container__input">
                <input
                  type="text"
                  onChange={(e) => setZoomId(e.target.value)}
                  placeholder="If virtual, please provide zoom room ID."
                />
              </div>
              <div id="host-container__input"></div>
            </form>
            <button onClick={(e) => handleCreateMeeting()}>host</button>
          </div>
        </div>
      </div>
    </>
  );
}
