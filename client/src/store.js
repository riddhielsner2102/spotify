import { createStore, applyMiddleware } from 'redux'; // Import from 'redux'
import thunk from 'redux-thunk'; // If using redux-thunk middleware
import rootReducer from './redux/reducer/rootreducer'; // Import your combined reducers

// Apply middleware
const middleware = [thunk]; // Add any other middleware here if needed

// Create the Redux store
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
