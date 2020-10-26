import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../../actions/index';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
        {boards.map((board, index) => (
          <Link to={`/board/${index}`} key={board.title}>
            <ListItem button onClick={() => { dispatch(setBoard(index)); }}>
              <ListItemText primary={board.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

BoardList.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default BoardList;
