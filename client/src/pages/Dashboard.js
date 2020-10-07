import React from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

export default function Dashboard() {
const currentUserId = useSelector(state=> state.auth.id)

 
if(!currentUserId){
  return <Redirect to='/login'></Redirect>
}

  return (
    <>
      <div id='dashboard__main'>
        <div id='dashboard__main-top'>
         <Navbar/>
        </div>
        <div id='dashboard__main-middle'>
          
        </div>
        <div id='dashboard__main-bottom'>

        </div>
      </div>
    </>
  )
}