import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BoardLogo from '../../assets/images/boards.png';
import { setBoard } from '../../actions/index';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#3f51b5',
  },
  textList: {
    color: 'white',
    outline: 'none',
    '& span': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  },
  svgIcon: {
    color: 'white',
    paddingRight: '1rem',
  },
  appLogo: {
    width: '100px',
    display: 'block',
    margin: '2rem auto',
  },
});

function BoardList({ setIsMenuOpen }) {
  const classes = useStyles();
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={() => { setIsMenuOpen(false); }}
      onKeyDown={() => { setIsMenuOpen(false); }}
    >
      <List>
        <img className={classes.appLogo} src={BoardLogo} alt="Logo App The Board" />
        {
          boards.map((board, index) => (
            <Link to={`/board/${index}`} key={board.title}>
              <ListItem button onClick={() => { dispatch(setBoard(index, { propagate: true })); }}>
                <DashboardIcon className={classes.svgIcon} />
                <ListItemText primary={board.title} className={classes.textList} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </div>
  );
}

BoardList.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default BoardList;
