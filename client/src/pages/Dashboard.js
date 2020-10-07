import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/dashboard.css'

export default function Dashboard() {
const currentUserId = useSelector(state=> state.auth.id)
console.log(currentUserId)


  return (
    <>
      <div id='dashboard__main'>
        <div id='dashboard__top'>
          <div id='dashboard__nav'>

          </div>
          <div id='dashboard__banner'>
           this is the dashboard
          </div>
        </div>
        <div id='dashboard__middle'>

        </div>
        <div id='dashboard__bottom'>

        </div>
      </div>
    </>
  )
}