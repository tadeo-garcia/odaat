import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logout } from '../store/auth';
import Feed from '../components/Feed'
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import Host from '../components/Host';
import Steps from '../components/Steps';

function Sidebar({contentRef}) {
  // const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout())
    // history.push('/')
    return (<Redirect to='/'></Redirect>)
  }

  const setDisplayFeed = () => {
    contentRef.current = Feed()
  }

  const setDisplayProfile = () => {
    contentRef.current = Profile()
  }

  const setDisplaySettings = () => {
    contentRef.current = Settings()
  }

  const setDisplayHost = () => {
    contentRef.current = Host()
  }

  const setDisplaySteps = () => {
    contentRef.current = Steps()
  }


  return (
    <div id='sidebar-container'>
      <div id='sidebar-container__links'>
        <Link className='sidebar-container__link' to='/dashboard' onClick={setDisplayFeed}>
          <i className="fa fa-home" />
          <span>home </span>
        </Link>
        <Link className='sidebar-container__link' to='/dashboard' onClick={setDisplayProfile}>
          <i className="fa fa-user-circle" />
          <span>profile </span>
        </Link>
        <Link className='sidebar-container__link' to='/dashboard' onClick={setDisplaySettings}> 
          <i className="fa fa-cog" /> 
          <span>settings </span>
          </Link>
        <Link className='sidebar-container__link' to='/dashboard' onClick={setDisplayHost}>
          <i className="fa fa-calendar-o" /> 
          <span>host</span>
          </Link>
        <Link className='sidebar-container__link' to='/dashboard' onClick={setDisplaySteps}>
          <i className="fa fa-book" />
          <span>12 steps</span>
        </Link>
        <Link className='sidebar-container__link' to='/'>
          <i className="fa fa-sign-out"/> 
          <span onClick={handleLogout}>logout</span>
        </Link>
      </div>
    </div>
  )
};

export default Sidebar;