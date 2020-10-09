import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from 'react-router-dom'

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Footer from "../components/Footer";

export default function Dashboard() {
  const currentUserId = useSelector((state) => state.auth.id);
  const contentRef = useRef();

  if (!currentUserId) {
    return <Redirect to="/"></Redirect>;
  }
  if (contentRef.current === undefined) {
    contentRef.current = Feed();
  }

  return (
    <>
      <div id="dashboard__main">
        <div id="dashboard__top">
          <Navbar />
        </div>
        <div id="dashboard__main-middle">
          <div id="dashboard__sidebar">
            <Sidebar contentRef={contentRef} />
          </div>
          <div id="dashboard__content" ref={contentRef}>
            {contentRef.current}
          </div>
        </div>
        <div id="dashboard__main-bottom">
          <Footer />
        </div>
      </div>
    </>
  );
}
