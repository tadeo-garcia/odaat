import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Dashboard() {
const currentUserId = useSelector(state=> state.auth.id)

 
if(!currentUserId){
  return <Redirect to='/'></Redirect>
}

  return (
    <>
      <div id='dashboard__main'>
        <div id='dashboard__-top'>
         <Navbar/>
        </div>
        <div id='dashboard__main-middle'>
          <div id='dashboard__sidebar'>
            <Sidebar/>
          </div>
          <div id='dashboard__content'>

          </div>
        </div>
        <div id='dashboard__main-bottom'>
        <Footer/>
        </div>
      </div>
    </>
  )
}