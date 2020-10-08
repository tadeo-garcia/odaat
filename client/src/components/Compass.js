import React from "react";

export default function Compass({ panTo }) {
  return (
    <button
      className="map-container__compass"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <i className="fa fa-2x fa-compass" />
    </button>
  );
}
