import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import propagateSocket from '../middleware/propagateSocket';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(propagateSocket),
));
/* eslint-enable */

export default store;
