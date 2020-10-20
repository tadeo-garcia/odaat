import React from "react";
import Auth from "../components/Auth";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/About" component={AboutPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Auth />
    </>
  );
}
