import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Board from './components/Board/Board';
import AppToolbar from './components/AppToolbar/AppToolbar';
import store from './store/index';
import Error404 from './components/Basics/Error404';
import './index.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <AppToolbar />
        <Switch>
          <Route path="/board/:id">
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
