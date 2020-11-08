import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppLogo from '../../assets/images/the_board.png';
import BoardLogo from '../../assets/images/boards.png';
import { setBoard } from '../../actions/index';

const useStyles = makeStyles({
  homeContainer: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appLogo: {
    maxWidth: '200px',
    display: 'block',
    margin: '2rem auto',
  },
  boardLogo: {
    height: '50px',
    paddingRight: '2rem',
  },
  paperList: {
    width: '500px',
    maxWidth: '100vw',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    margin: '1rem 0',
    backgroundColor: '#4051b5',
  },
  textList: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
});

function Home() {
  const classes = useStyles();
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  return (
    <div className={classes.homeContainer}>
      <img className={classes.appLogo} src={AppLogo} alt="Logo App The Board" />
      {
        boards.map((board, index) => (
          <Link to={`/board/${index}`} onClick={() => { dispatch(setBoard(index, { propagate: true })); }} key={board.title} className={classes.paperList}>
            <Paper elevation={3} className={classes.paper}>
              <img className={classes.boardLogo} src={BoardLogo} alt="Logo for boards" />
              <p className={classes.textList}>{board.title}</p>
            </Paper>
          </Link>
        ))
      }
    </div>
  );
}

export default Home;
