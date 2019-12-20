import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../redux/actions/adminActions';
import { login } from '../../services/auth';
import errorMsg from '../../utils/errorMsg';

import './FormLogin.scss';
// IMPORTAMOS LIBRERIAS Y DEFINIMOS LA FUNCIÓN, ES UNA FUNCIÓN SENCILLA DONDE IMPORTAMOS EL LOGIN DE FIREBASE Y LE PASAMOS POR
// PROP EL HISTORY QUE LO UTILIZAREMOS PARA IR A UNA PÁGINA ESPECÍFICA SI EL LOGIN ES CORRECTO

function FormLogin() {
  const history2 = useHistory();
  // SETEAMOS LOS USESTATE Y EL HANDLE, SEGÚN EL LOGIN QUE HAGA IRÁ A UNA PÁGINA U OTRA.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorRegistry, setErrorRegistry] = useState('');
  const dispatch = useDispatch();

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email y password son obligatorios');
    } else {
      const result = await login(email, password);
      if (result && result.code) {
        const errorUi = errorMsg[result.code];
        setErrorRegistry(errorUi);
      }
    }

    const result = await login(email, password);
    if (result) {
      if (email === 'admin@admin.com') {
        dispatch(setAdmin(true));
      }
      history2.push('/');
    }
  };

  // CONFIGURAMOS CLASES Y DIVS CON EL FORMULARIO Y LOS ONCHANGE
  return (
    <>
      <div className="form-login">
        <h2>Login form: </h2>
        {error && <div className="form-error">{error}</div>}
        {errorRegistry && <div className="form-error">{errorRegistry}</div>}
        <form onSubmit={handleSubmitLogin}>
          <input placeholder="Escribe tu e-mail" type="text" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
          <input placeholder="Escribe tu password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
          <input type="submit" value="Login" />
        </form>
        <div className="button-registro"><Link to="/FormRegistry"><p>No estás registrado? Crea tu cuenta.</p></Link></div>
      </div>
    </>
  );
}

export default FormLogin;
