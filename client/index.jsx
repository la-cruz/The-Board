import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Board from './components/Board/Board';
import AppToolbar from './components/AppToolbar/AppToolbar';
import store from './store/index';
import Error404 from './components/Basics/Error404';
import { setBoard } from './actions';
import './index.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io();
    socket.on('action', (params) => {
      switch (params.type) {
        case 'set_board':
          dispatch(setBoard(params.value, { propagate: false }));
          break;
        default:
          break;
      }
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="app">
      <Router>
        <AppToolbar />
        <Switch>
          <Route path="/board/:id/:idPostit">
            <Board mobile />
          </Route>
          <Route path="/board/:id">
            { isMobile ? <Redirect to="/board/:id/0" /> : <Board /> }
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
