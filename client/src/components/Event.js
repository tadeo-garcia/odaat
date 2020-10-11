import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyle from "./MapStyle";
import Compass from "./Compass";

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

  // const dispatch = useDispatch();
  const meeting = useSelector((state) => state.meetings.meeting);
  // console.log(meeting);
  const meetings = useSelector((state) => state.meetings.meetings);
  const [center, setCenter] = useState(null);

  // let center = { lat: meeting.lat, lng: meeting.lng };
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

  return (
    <>
      <div id="meeting-container">
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
                <span>Join us on: {meeting.date}</span>
                <br />
                <span>Starts at: {meeting.time}</span>
                <br />
              </div>
            </InfoWindow>
          </GoogleMap>
        </div>
        <div id="meetings-container__header">
          <span>CURRENT MEETING TITLE</span>
        </div>
        <div id="meeting-container-info"></div>
      </div>
    </>
  );
}
