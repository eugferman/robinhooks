import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <p>Estas en About</p>
      <ul>
        <li><Link to="/">Back</Link></li>
      </ul>
    </>
  );
}

export default About;
