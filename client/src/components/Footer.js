import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {


  return (
    <div id='footer-container'>
      <div id='footer-container__left'>
        <div>
          <Link id='footer-container__link' to='/about'>
            <span > About </span>
          </Link>
        </div>
      </div>
      <div id='footer-container__middle'>
        <a id='footer-container__link' href='https://github.com/tadeo-garcia/odaat/branches' >
          <i className="fa fa-2x fa-github" aria-hidden="true"></i>
        </a>
    </div>
      <div id='footer-container__right'>
        <div >
        </div>
      </div>
    </div>
  )
}

export default Footer;
