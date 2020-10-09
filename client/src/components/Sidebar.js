import React from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../store/auth";

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    return <Redirect to="/"></Redirect>;
  };

  return (
    <div id="sidebar-container">
      <div id="sidebar-container__links">
        <Link className="sidebar-container__link" to="/Dashboard">
          <i className="fa fa-home" />
          <span>home </span>
        </Link>
        <Link className="sidebar-container__link" to="/Dashboard/Profile">
          <i className="fa fa-user-circle" />
          <span>profile </span>
        </Link>
        <Link className="sidebar-container__link" to="/Dashboard/Settings">
          <i className="fa fa-cog" />
          <span>settings </span>
        </Link>
        <Link className="sidebar-container__link" to="/Dashboard/Host">
          <i className="fa fa-calendar-o" />
          <span>host</span>
        </Link>
        <Link className="sidebar-container__link" to="/Dashboard/Steps">
          <i className="fa fa-book" />
          <span>12 steps</span>
        </Link>
        <Link className="sidebar-container__link" to="/">
          <i className="fa fa-sign-out" />
          <span onClick={handleLogout}>logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
