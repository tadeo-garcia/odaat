import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMeeting, deleteMeeting } from "../store/meetings";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useHistory, Link } from "react-router-dom";
import MapApi from "./Map";

export default function EditMeeting() {
  const currentUserId = useSelector((state) => state.auth.id);
  const meeting = useSelector((state) => state.meetings.meeting);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [virtual, setVirtual] = useState(false);
  const [virtualChange, setVirtualChange] = useState(null);
  const [zoomId, setZoomId] = useState(null);
  const [official, setOfficial] = useState(false);
  const [officialChange, setOfficialChange] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const extractCoord = async () => {
    let address = location;
    if (!officialChange) {
      setOfficial(false);
    }

    if (!virtualChange) {
      setVirtual(false);
    }

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      dispatch(
        updateMeeting(
          currentUserId,
          currentMeetingId,
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

      return history.push(`/Dashboard/meetings/${meeting.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateMeeting = () => {
    if (location) {
      extractCoord();
    } else {
      dispatch(
        updateMeeting(
          currentUserId,
          currentMeetingId,
          title,
          description,
          date,
          time,
          virtual,
          zoomId,
          official
        )
      );
      return history.push(`/Dashboard/meetings/${meeting.id}`);
    }
  };

  const handleVirtual = () => {
    setVirtualChange(true);
    if (virtual === false) {
      return setVirtual(true);
    } else {
      return setVirtual(false);
    }
  };

  const handleOfficial = () => {
    setOfficialChange(true);
    if (official === false) {
      return setOfficial(true);
    } else {
      return setOfficial(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteMeeting(meeting.id));
  };

  if (!meeting) return null;
  let currentMeetingId = meeting.id;

  return (
    <>
      <div id="host-wrapper">
        <div className="hidden">
          <MapApi />
        </div>
        <div id="host-container">
          <div id="host-container__info">Fill out any fields you want to update!</div>
          <div id="host-container__form-div">
            <form id="host-container__form">
              <div className="host-container__input-div">
                <input
                  type="text"
                  className="host-container__input"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`Edit current title: ${meeting.title}`}
                />
              </div>
              <div className="host-container__input-div">
                <input
                  type="text"
                  className="host-container__input"
                  placeholder={`Edit current address: ${meeting.location}`}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className=" host-container__input-div description-box">
                <textarea
                  type="text-area"
                  className="host-container__input"
                  rows={10}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Edit current description: ${meeting.description}`}
                />
              </div>
              <div className="host-container__input-div">
                <span className="host-container__input-descript">
                  Edit the date for your meeting.
                </span>
                <input
                  type="date"
                  className="host-container__input"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="host-container__input-div">
                <span className="host-container__input-descript">
                  {" "}
                  Edit the time for your meeting.{" "}
                </span>
                <input
                  type="time"
                  className="host-container__input"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="host-container__input-div-check">
                <span>
                  If this is an official Alcoholics Anonymous meeting please mark the check box.
                </span>
                <input
                  type="checkbox"
                  className="host-container__input-check"
                  onClick={handleOfficial}
                />
              </div>
              <div className="host-container__input-div-check">
                <span>If this is intended to be a virtual meeting please mark the check box.</span>
                <input
                  type="checkbox"
                  className="host-container__input-check"
                  onClick={handleVirtual}
                />
              </div>
              <div className="host-container__input-div">
                <input
                  type="text"
                  className="host-container__input"
                  onChange={(e) => setZoomId(e.target.value)}
                  placeholder={`Edit the zoom_id: ${meeting.zoom_id}`}
                />
              </div>
            </form>
            <div className="host-container__input-div">
              <button className="host-container__button" onClick={(e) => handleUpdateMeeting()}>
                update
              </button>
            </div>
            <div className="host-container__input-div">
              <Link to="/Dashboard">
                <button className="host-container__button" onClick={(e) => handleDelete()}>
                  cancel meeting
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
