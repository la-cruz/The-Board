import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Board from './components/Board/Board';
import AppToolbar from './components/AppToolbar/AppToolbar';
import data from './data/data.json';

function App() {
  const [boards, setBoards] = useState(data);
  const [index, setIndex] = useState(0);

  return (
    <div className="app">
      <Router>
        <AppToolbar boards={boards} setIndex={setIndex} index={index} />
        <Switch>
          <Route path="/board/:id">
            <Board board={boards[index]} index={index} setIndex={setIndex} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
