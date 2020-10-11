import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMeetings } from "../store/meetings";
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

  const dispatch = useDispatch();
  const meeting = useSelector((state) => state.meetings.meeting);
  console.log(meeting);
  const meetings = useSelector((state) => state.meetings.meetings);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(null);

  // useEffect(() => {
  //   dispatch(getMeetings());
  // }, [dispatch]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(newCenter);
      },
      () => {
        setCenter({
          lat: 32.776665,
          lng: -96.796989,
        });
      }
    );
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
            {/* {meetings.map((meeting, idx) => (
              <Marker
                key={idx}
                position={{ lat: meeting.lat, lng: meeting.lng }}
                onClick={() => {
                  setSelected(meeting);
                }}
              />
            ))} */}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h4>Meeting: {selected.title}</h4>
                  <span>Join us on: {selected.date}</span>
                  <br />
                  <span>Starts at: {selected.time}</span>
                  <br />
                  <span>
                    Click{" "}
                    <Link id="map__link-meeting" to={`/dashboard/meetings/${selected.id}`}>
                      here
                    </Link>{" "}
                    to see more details about the meeting.
                  </span>
                </div>
              </InfoWindow>
            ) : null}
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
