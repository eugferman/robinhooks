import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.scss';

function Header() {
  const user = useSelector((state) => state.user);
  const isLogged = user !== null;


  return (
    <>
      <div className="header">
        <div className="header-opacity">
          <div className="header-title-nav">
            <div className="header-title"><h1>RobinHooks</h1></div>
            <div className="header-nav">
              {isLogged && <div><Link to="logout">Logout</Link></div>}
              {!isLogged && <div><Link to="login">Login</Link></div>}
              {!isLogged && <div><Link to="formregistry">Registro</Link></div>}
            </div>
          </div>
        </div>
        <div className="header-separation" />
      </div>
    </>
  );
}

export default Header;
