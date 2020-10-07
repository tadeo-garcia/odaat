import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logout } from '../store/auth'


function Sidebar() {
  // const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout())
    // history.push('/')
    return (<Redirect to='/'></Redirect>)
  }

  return (
    <div id='sidebar-container'>
      <div id='sidebar-container__links'>
        <Link className='sidebar-container__link' to='/dashboard'>
          <i className="fa fa-home" />
          <span> home </span>
        </Link>
        <Link className='sidebar-container__link' to='/profile'>
          <i className="fa fa-user-circle" />
          <span> profile </span>
        </Link>
        <Link className='sidebar-container__link' to='/settings'> 
          <i className="fa fa-cog" /> 
          <span> settings </span>
          </Link>
        <Link className='sidebar-container__link' to='/settings'>
          <i className="fa fa-calendar-o" /> 
          <span> host</span>
          </Link>
        <Link className='sidebar-container__link' to='/settings'>
          <i className="fa fa-book" />
          <span> 12 steps</span>
        </Link>
        <Link className='sidebar-container__link' to='/'>
          <i className="fa fa-sign-out"/> 
          <span onClick={handleLogout}> logout</span>
        </Link>
      </div>
    </div>
  )
};

export default Sidebar;