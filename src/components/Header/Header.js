import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>Header Component</h1>
      <ul>
        <li><Link to="home">Home</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>
    </>
  );
}

export default Header;
