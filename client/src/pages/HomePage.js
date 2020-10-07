import React from 'react';
import {useSelector} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'



export default function HomePage() {
const currentUserId = useSelector(state => state.auth.id)

if (typeof currentUserId === 'number'){
  return <Redirect to='/dashboard' />
} 
  
return (
    <> 
      <div id='homepage__main'>
        <div id='homepage__top'>
          <div id='homepage__nav'>
          
          </div>
          <div id='homepage__banner'>
            <span> welcome to odaat.</span>
            <br/>
            <span>click <span>here</span> learn more</span>
            <br />
            <span>click <Link to='/login'>here</Link> to sign in</span>
            <br />
            <span>click <Link to='/signup'>here</Link> to sign up</span>
          </div>
        </div>
        <div id='homepage__middle'>

        </div>
        <div id='homepage__bottom'>

        </div>
      </div>
    </>
  )
}
