import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
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

function PostitListMobile({ postits }) {
  const classes = useStyles();
  const { idPostit } = useParams();

  return (
    <div className={classes.root}>
      {
        postits[idPostit]
        && <Postit postit={postits[idPostit]} i={parseInt(idPostit, 10)} />
      }
    </div>
  );
}

PostitListMobile.propTypes = {
  postits: PropTypes.instanceOf(Array).isRequired,
};

export default PostitListMobile;
