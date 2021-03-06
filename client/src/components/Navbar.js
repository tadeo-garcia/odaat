import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { logout } from "../store/auth";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    return <Redirect to="/"></Redirect>;
  };

  return (
    <div id="nav-container">
      <div id="nav-container__left">
        <div id="nav-container__title">
          <span>One Day At A Time</span>
        </div>
      </div>
      <div id="nav-container__middle">
        “There is an island of opportunity in the middle of every difficulty.”
      </div>
      <div id="nav-container__right">
        <div id="nav-container__right-profile">
          <NavLink id="nav-container__right-link" exact to={`/Dashboard/Profile`}>
            profile
          </NavLink>
        </div>
        <div id="nav-container__right-home">
          <NavLink exact to="/dashboard" id="nav-container__right-link">
            home
          </NavLink>
        </div>
        <div id="nav-container__right-logout">
          <span id="nav-container__right-link" onClick={handleLogout}>
            logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
