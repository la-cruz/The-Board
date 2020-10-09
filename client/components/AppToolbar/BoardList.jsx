import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function BoardList({ boards, setIndex, setIsMenuOpen }) {
  const classes = useStyles();

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
            <ListItem button onClick={() => { setIndex(index); }}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={board.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

BoardList.propTypes = {
  boards: PropTypes.instanceOf(Object).isRequired,
  setIndex: PropTypes.func.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default BoardList;
