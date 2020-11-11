import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Postit from './Postit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      padding: '1rem',
      margin: theme.spacing(1.2),
      width: '30%',
    },
  },
}));

function PostitList({ postits }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        postits.map((postit, i) => (
          <Postit postit={postit} index={i} key={`${postit.text}-${postit.title}`} />
        ))
      }
    </div>
  );
}

PostitList.propTypes = {
  postits: PropTypes.instanceOf(Array).isRequired,
};

export default PostitList;
