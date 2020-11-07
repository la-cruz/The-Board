import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Board from './components/Board/Board';
import AppToolbar from './components/AppToolbar/AppToolbar';
import store from './store/index';
import Error404 from './components/Basics/Error404';
import './assets/sass/index.scss';
import './assets/sass/style.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <AppToolbar />
        <Switch>
          {
            isMobile
            && <Redirect exact from="/board/:id" to="/board/:id/0" />
          }
          <Route exact path="/board/:id/:idPostit">
            <Board mobile />
          </Route>
          <Route exact path="/board/:id">
            <Board />
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
