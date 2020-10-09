import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';

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

function Board({ board, index, setIndex }) {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    if (id !== index) {
      setIndex(parseInt(id, 10));
    }
  }, [index]);

  return (
    <div className={classes.root}>
      {
        board.postits.map((postit, i) => (
          <Paper elevation={4} style={{ backgroundColor: postit.color }} key={postit.title}>
            <h5>{`${i}. ${postit.title}`}</h5>
            <p>{ postit.text }</p>
          </Paper>
        ))
      }
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default Board;
