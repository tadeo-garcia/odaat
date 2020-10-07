import React from 'react';
// import Navbar from '../components/Navbar'
import Auth from '../components/Auth'
import { Route } from 'react-router-dom';
import HomePage from './HomePage'
// import Profile from './Profile'
import Dashboard from './Dashboard'




export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
     { // <Route exact path="/profile" component={Profile} />
    }
      <Route exact path='/dashboard' component={Dashboard} />
      <Auth />
    </>
  )
}
