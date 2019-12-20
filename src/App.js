import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from './redux/actions/userActions';
import { setAdmin } from './redux/actions/adminActions';
import { registerAuthObserver } from './services/auth';
import { getItem } from './services/database';

import Header from './components/Header/Header';
import Logout from './pages/Logout/Logout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import FormRegistry from './components/FormRegistry/FormRegistry';
import UserArea from './components/UserArea/UserArea';
import Coleccion from './components/Coleccion/Coleccion';

import './App.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelObserver = registerAuthObserver(async (user) => {
      if (user) {
        const profile = await getItem('usuarios-registrados', user.uid);
        if (profile) {
          dispatch(setUser(profile));
        } else {
          if (user.email === 'admin@admin.com') {
            dispatch(setAdmin(true));
          }
          console.log('todavía se está registrando');
        }
      } else {
        dispatch(setUser(null));
      }
      setIsLoading(false);
    });

    return () => {
      cancelObserver();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  const isLogged = userRedux !== null;

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/logout" component={Logout} />
          {!isLogged && <Route path="/login" component={Login} />}
          <Route path="/formregistry" component={FormRegistry} />
          <Route path="/homeadmin" component={HomeAdmin} />
          <Route path="/userarea" component={UserArea} />
          <Route path="/:id" component={Coleccion} />
          <Route exact path="/" component={Home} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
