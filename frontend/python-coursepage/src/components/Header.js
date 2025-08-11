import React from 'react';
import './Header.css';

function Header({ onEnrollClick }) {
  return (
    <header className="header">
      <div className="logo">AI Tutor</div>
      <nav className="nav-links">
        <div className="dropdown">
          Courses &#x25BE;
          <div className="dropdown-content">
            <a href="#python">Python Programming</a>
            <a href="#webdev">Web Development</a>
            <a href="#datasci">Data Science</a>
          </div>
        </div>
        <a href="#offer">What we offer</a>
        <a href="#blog">Blog</a>
      </nav>
      <button className="enroll-btn" onClick={onEnrollClick}>Enroll now</button>
    </header>
  );
}

export default Header;
