import React from 'react';
import { logout } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setAdmin } from '../../redux/actions/adminActions';

//COMPONENTE SENCILLO QUE SI LO CLICAMOS NOS CIERRA LA SESIÓN DEL USUARIO.
function Logout({history}) {
  const dispatch = useDispatch();
  logout();
  dispatch(setUser(null));
  dispatch(setAdmin(false));
  history.push("/");
  
  return (
    <>
      <div className="logout">
        <h2>Has cerrado sesión.</h2>
      </div>      
    </>
  );
}

export default Logout;
