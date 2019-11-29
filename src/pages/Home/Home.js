import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <p>Estas en Home</p>
      <ul>
        <li><Link to="/">Back</Link></li>
      </ul>
    </>
  );
}

export default Home;
