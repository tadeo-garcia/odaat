import React from 'react';
import Auth from '../components/Auth'
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard'
import HomePage from './HomePage'
// import Profile from './Profile'




export default function Pages() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Auth />
    </>
  )
}
