import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';

const rootReducers = combineReducers({
  user: userReducer, isAdmin: adminReducer
})

export default rootReducers;