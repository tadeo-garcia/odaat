import React, { useCallback, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyle from "./MapStyle";
import Search from "./Search";
import Compass from "./Compass";
// import { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 32.776665,
  lng: -96.796989,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function MapApi() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const meetings = useSelector((state) => state.meetings.meetings);
  let coords = [];

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  if (!meetings) return null;

  return (
    <>
      <div id="map-container">
        <Search panTo={panTo} />
        <Compass panTo={panTo} />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          id={"google-map"}
          zoom={8}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {meetings.map((meeting, idx) => (
            <Marker
              key={idx}
              position={{ lat: meeting.lat, lng: meeting.lng }}
              onClick={() => {
                setSelected(meeting);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h4>{selected.title}</h4>
                <span>Join us on: {selected.date}</span>
                <br />
                <span>Meeting starts at: {selected.time}</span>
                <br />
                <span>{selected.id}</span>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}

// EXTRA FUNCTIONS I MAY OR MAY NOT NEED

// const onMapClick = useCallback((e) => {
//   setMarkers((current) => [
//     ...current,
//     {
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//       time: new Date(),
//     },
//   ]);
// }, []);

// const extractCoord = async (meeting) => {
//   let address = meeting.location;
//   try {
//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     coords.push({ lat, lng });
//     // console.log(coords);
//   } catch (e) {
//     console.log(e);
//   }
// };

// let i = 0;
// let intervalId = setInterval(() => {
//   if (i === meetings.length - 1) {
//     clearInterval(intervalId);
//   }
//   extractCoord(meetings[i]);
//   i++;
// }, 400);

// if (coords.length < 0) return "loading meetings!";
