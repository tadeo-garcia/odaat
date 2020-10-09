import React from "react";
import MapApi from "./Map";
import Meetings from "./Meetings";

export default function Feed() {
  return (
    <>
      <div id="feed-container">
        <MapApi />
        <Meetings />
      </div>
    </>
  );
}
