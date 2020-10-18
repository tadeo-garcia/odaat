import React, { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyle from "./MapStyle";
import Compass from "./Compass";
import { loadFollowUser } from "../store/user";
import { getMeeting } from "../store/meetings";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

export default function Event() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const currentUserId = useSelector((state) => state.auth.id);
  const meeting = useSelector((state) => state.meetings.meeting);
  const meetings = useSelector((state) => state.meetings.meetings);
  const [center, setCenter] = useState(null);
  let hostButton;

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    mapRef.current.setZoom(13);
    let center = { lat: meeting.lat, lng: meeting.lng };
    setCenter(center);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  if (!meetings) return null;

  if (currentUserId === meeting.host_id) {
    hostButton = true;
  } else {
    hostButton = false;
  }

  return (
    <>
      <div id="event-container">
        <div id="map-container">
          <Compass panTo={panTo} />
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            id={"google-map"}
            zoom={10}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            <Marker key={meeting.id} position={{ lat: meeting.lat, lng: meeting.lng }} />
            <InfoWindow position={{ lat: meeting.lat, lng: meeting.lng }}>
              <div>
                <h4>Meeting: {meeting.title}</h4>
                <span>Join us at: {meeting.location}</span>
                <br />
              </div>
            </InfoWindow>
          </GoogleMap>
        </div>
        <div id="event-container__main">
          <div id="meeting-container__info">
            <div id="event-container__header">
              <span>Please join us for the {meeting.title} !</span>
            </div>
            <div id="meeting-container__info-details">
              {" "}
              {meeting.date} at {meeting.time}{" "}
            </div>
            <div id="meeting-container__info-details">{meeting.description}</div>
            {meeting.official ? (
              <div id="meeting-container__info-details">
                This is an official AA meeting, where we will go through all of our regular
                traditions.
              </div>
            ) : (
              <div id="meeting-container__info-details">
                This is not an official AA meeting, but instead an event for those who wish to
                participate in sober activities with other members in recovery!
              </div>
            )}
            {meeting.virtual ? (
              <div id="meeting-container__info-details">
                This is an online meeting, please log into zoom with the following password at the
                start of the meeting.
                <br />
                <br />
                password: {meeting.zoom_id}
              </div>
            ) : (
              <div id="meeting-container__info-details">
                This is not an online meeting, please remember to wear a mask and practice proper
                social distancing when possible!
              </div>
            )}
          </div>
          <div>
            {hostButton ? (
              <Link to={`/dashboard/meetings/${meeting.id}/edit`}>
                <button className="meeting-container__button">edit your meeting</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
