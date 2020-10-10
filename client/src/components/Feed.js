import React from "react";
import MapApi from "./Map";
import Meetings from "./Meetings";
import Host from "./Host";
import { Redirect, Switch, Route } from "react-router-dom";

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
