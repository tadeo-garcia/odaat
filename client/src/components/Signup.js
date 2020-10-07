import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/auth';
import { Redirect, Link } from 'react-router-dom';
import '../css/signup.css'

let emailDiv = "signup-container__input";
let passwordDiv = "signup-container__input";

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noInfo, setNoInfo] = useState('');
  const [noEmail, setNoEmail] = useState('');
  const [noPassword, setNoPassword] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  
  const handleSubmit = e => {
    e.preventDefault();
    setNoEmail('');
    setNoPassword('');
    setNoInfo('');

    if (email && password) {
      dispatch(signup(username, email.toLocaleLowerCase(), password));
    } else if (!email && password) {
      emailDiv = "signup-container__input-bad";
      setNoEmail("Please check your email.")
    } else if (email && !password) {
      passwordDiv = "signup-container__input-bad";
      setNoPassword("Please check your password.");
    } else {
      emailDiv = "signup-container__input-bad";
      passwordDiv = "signup-container__input-bad";
      setNoInfo("Please enter your information.")
    }
  }

  if (currentUserId) return <Redirect to='/' />

  return (
    <>
      <div className='signup-wrapper'>
        <div className="signup-container">
          <div className='signup-container__redirect'>
            Have and account? <Link to='/login' style={{ textDecoration: 'none', color: '#014178', fontWeight: 'bold' }} > Log in </Link>
          </div>
          <form className='signup-container__form' onSubmit={handleSubmit}>
            <div className='signup-container__label'>
              Sign up
            </div>
            <div>
              <input type='text' className={emailDiv} name='username' value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <div className='signup-container__warning' style={{ color: 'red' }}>{noInfo}</div>
              <input type='email' className={emailDiv} name='email' value={email} placeholder="Email *" onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div className='signup-container__warning' style={{ color: 'red' }}>{noInfo}</div>
              <input type='email' className={emailDiv} name='email' value={email} placeholder="Re-enter Email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='signup-container__warning' style={{ color: 'red' }}>{noEmail}</div>
            <div>
              <input type='password' className={passwordDiv} name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='signup-container__warning' style={{ color: 'red' }}>{noPassword}</div>
            <div>
              <input type='password' className={passwordDiv} name='password' value={password} placeholder='Re-Enter Password' onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <button type='submit' className='signup-button'>Create account</button>
            </div>
            <div className='signup-container__disclaimer'>
              <span>*For your privacy and anonymity only your username will be displayed to other users once you have logged in.</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Signup;
