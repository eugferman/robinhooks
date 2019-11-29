import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT_COUNT':
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  counterReducer
});

const INITIAL_STATE = {};

const store = createStore(rootReducer, INITIAL_STATE);

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/home" component={Home}><Home /></Route>
          <Route path="/about" component={About}><About /></Route>
        </Switch>
      </Router>
      <Provider store={store}>
        <Counter />
      </Provider>
    </>
  );
}

function Counter() {
  const { count } = useSelector((state) => ({
    ...state.counterReducer
  }));
  const dispatch = useDispatch();

  function incrementCount() {
    dispatch({
      type: 'INCREMENT_COUNT'
    });
  }

  function decrementCount() {
    dispatch({
      type: 'DECREMENT_COUNT'
    });
  }

  return (
    <>
      <h2>Counter: {count}</h2>
      <button type="button" onClick={incrementCount}>+</button>
      <button type="button" onClick={decrementCount}>-</button>
    </>
  );
}

export default App;
