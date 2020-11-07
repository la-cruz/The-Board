import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePostit } from '../../actions/index';

function Postit({ postit, i }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  return (
    <Paper elevation={4} style={{ position: 'relative', backgroundColor: '#F7F77E' }}>
      <h3 className="title-postit">{`${i}. ${postit.title}`}</h3>
      <p>{ postit.text }</p>
      <span style={{
        backgroundColor: postit.color,
        boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)',
        position: 'absolute',
        width: '40px',
        height: '40px',
        borderRadius: '50px',
        top: '10px',
        right: '10px',
      }}
      />
      <Fab
        size="small"
        color="secondary"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
        onClick={() => {
          dispatch(deletePostit({ id: parseInt(id, 10), idToDelete: i }, { propagate: true }));
        }}
      >
        <DeleteIcon size="small" />
      </Fab>
    </Paper>
  );
}

Postit.propTypes = {
  postit: PropTypes.instanceOf(Object).isRequired,
  i: PropTypes.number.isRequired,
};

export default Postit;
