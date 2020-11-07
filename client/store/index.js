import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import propagateSocket from '../middleware/propagateSocket';

const middlewareEnhancer = applyMiddleware(propagateSocket);

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  compose(
    middlewareEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

export default store;
