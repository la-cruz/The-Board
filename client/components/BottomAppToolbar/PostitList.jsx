import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function PostitList({ setIsMenuOpen }) {
  const classes = useStyles();
  const index = useSelector((state) => state.index);
  const postits = useSelector((state) => state.boards[index].postits);

  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={() => { setIsMenuOpen(false); }}
      onKeyDown={() => { setIsMenuOpen(false); }}
    >
      <List>
        {
          postits.map((postit, id) => (
            <Link to={`/board/${index}/${id}`} key={postit.title}>
              <ListItem button>
                <ListItemText primary={postit.title} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </div>
  );
}

PostitList.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default PostitList;
