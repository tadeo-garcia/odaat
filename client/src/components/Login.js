import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { Redirect, Link } from 'react-router-dom';
import '../css/login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noEmail, setNoEmail] = useState('');
  const [noPassword, setNoPassword] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const warning = useSelector(state => state.auth)
  

  const dispatch = useDispatch();
  let emailDiv = "login-container__input";
  let passwordDiv = "login-container__input";
  const handleSubmit = e => {
    e.preventDefault();
    setNoEmail('');
    setNoPassword('');

    if (email && password) {
      dispatch(login(email.toLocaleLowerCase(), password));
    } else if (!email && password) {
      emailDiv = "login-container__input-bad";
      setNoEmail("Please enter a valid email.")
    } else if (email && !password) {
      passwordDiv = "login-container__input-bad";
      setNoPassword("Please enter your password.");
    }
  }

  const demo = e => {
    e.preventDefault();
    dispatch(login('demo@odaat.com', 'password'))
  };

  
  if (currentUserId) return <Redirect to='/' />
  
  if(warning.length){
    emailDiv = "login-container__input-bad";
    passwordDiv = "login-container__input-bad";
  }

  return (
    <>
      <div className='login-wrapper'>
          <div className="login-container">
            <div id='login-container__label'>
              Log in
            </div>
            <form className='login-container__form' onSubmit={handleSubmit}>
              <div>
                <input type='email' className={emailDiv} name='email' value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className='login-container__warning' 
              style={{ color: 'red'}}>
                {noEmail}
              </div>
              <div>
                <input type='password' className={passwordDiv} name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
              </div>
              <div className='login-container__warning' style={{ color: 'red'}}>
                {noPassword}
              </div>
              <div>
              <button type='submit' className='login-container__button'>Log in</button>
              </div>
              <button className='login-container__button' onClick={demo}>Demo Log in</button>
            </form>
            <div id='login-container__redirect'>
            New to odaat? 
            <Link to="/signup" style={{ textDecoration: 'none', color: '#014178', fontWeight: '500' }} > Sign up </Link>
            </div>
          </div>
        </div>
    </>
  )
}
export default Login;
