import React, {useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MapApi from '../components/Map'
import Footer from '../components/Footer';

export default function Dashboard() {
const currentUserId = useSelector(state=> state.auth.id);
const [display, setDisplay] = useState(null)
const [displayHome, setDisplayHome] = useState(null);
const [displayProfile, setDisplayProfile] = useState(null);
const [displaySettings, setDisplaySettings] = useState(null);
const [displayHost, setDisplayHost] = useState(null);
const [displaySteps, setDisplaySteps] = useState(null);

const contentRef = useRef();
// console.log(contentRef.current)

const hideDisplay = (e) => {
  e.stopPropagation();
  setDisplay(null);
  setDisplayHome(null);
  setDisplayHome(null);
  setDisplayProfile(null);
  setDisplaySettings(null);
  setDisplayHost(null);
  setDisplaySteps(null);
}

const showDisplayHome = () => {
  setDisplayHome()
}

const showDisplayProfile = () => {
  setDisplayProfile()
}

const showDisplay = (component) => {
  setDisplay(component)
}

 
if(!currentUserId){
  return <Redirect to='/'></Redirect>
}
if(contentRef.current === undefined){
  contentRef.current = MapApi();
}

  return (
    <>
      <div id='dashboard__main'>
        <div id='dashboard__-top'>
         <Navbar/>
        </div>
        <div id='dashboard__main-middle'>
          <div id='dashboard__sidebar'>
            <Sidebar
              contentRef={contentRef}
            />
          </div>
          <div id='dashboard__content' ref={contentRef}>
            {contentRef.current}
          </div>
        </div>
        <div id='dashboard__main-bottom'>
        <Footer/>
        </div>
      </div>
    </>
  )
}