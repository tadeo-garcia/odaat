import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {logout} from '../store/auth'

function Navbar() {
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout())
    history.push('/')
  }

  return (
    <div id='nav-container'>
      <div id='nav-container__left'>
        <div id='' >
          <span id="nav-links">One Day At A Time</span>
          
        </div>
      </div>

      <div id='nav-container__middle'>
          “There is an island of opportunity in the middle of every difficulty.”
      </div>

      <div id='nav-container__right'>
        <div id='nav-container__right-profile' >
            <NavLink id='nav-container__right-link' exact to={`/user/${currentUserId}`}> 
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              profile
            </NavLink>
        </div>
        <div id='nav-container__right-home'>
          <NavLink exact to="/dashboard" id='nav-container__right-link'>home</NavLink>
        </div>
        <div id='nav-container__right-logout'>
          <span id='nav-container__right-link' onClick={handleLogout}>logout</span>
        </div>
      
      </div>

    </div>
  )
};

export default Navbar;