import { combineReducers } from 'redux';
import albumReducer from './album';
import authReducer from './auth';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  album: albumReducer, 
  auth : authReducer
});

export default rootReducer;

