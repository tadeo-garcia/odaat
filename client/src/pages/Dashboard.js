import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Host from "../components/Host";
import Settings from "../components/Settings";
import Steps from "../components/Steps";
import Profile from "../components/Profile";
import Event from "../components/Event";

export default function Dashboard() {
  const currentUserId = useSelector((state) => state.auth.id);
  const contentRef = useRef();

  if (!currentUserId) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <>
      <div id="dashboard__main">
        <div id="dashboard__top">
          <Navbar />
        </div>
        <div id="dashboard__main-middle">
          <div id="dashboard__sidebar">
            <Sidebar />
          </div>
          <div id="dashboard__content" ref={contentRef}>
            <Switch>
              <Route exact path="/dashboard" component={Feed} />
              <Route exact path="/dashboard/profile" component={Profile} />
              <Route exact path="/dashboard/Settings" component={Settings} />
              <Route exact path="/dashboard/host" component={Host} />
              <Route exact path="/dashboard/meetings/:id" component={Event} />
              <Route exact path="/dashboard/Steps" component={Steps} />
            </Switch>
          </div>
        </div>
        <div id="dashboard__main-bottom">
          <Footer />
        </div>
      </div>
    </>
  );
}
