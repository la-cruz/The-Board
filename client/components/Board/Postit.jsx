import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePostit, resetDrawPoint } from '../../actions/index';
import Canvas from './Canvas';
import EraserIcon from '../../assets/images/eraser.svg';
import OneDollar from '../../lib/oneDollar';
import {
  circle,
  triangle,
  chevronLeft,
  chevronRight,
} from '../../data/gesture';

function Postit({ postit, index }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const drawing = {
    clickX: postit.clickX,
    clickY: postit.clickY,
    clickDrag: postit.clickDrag,
  };

  const options = {
    score: 80, // The similarity threshold to apply the callback(s)
    parts: 64, // The number of resampling points
    step: 2, // The degree of one single rotation step
    angle: 45, // The last degree of rotation
    size: 250, // The width and height of the scaling bounding box
  };

  const recognizer = new OneDollar(options);

  recognizer.add('triangle', triangle);
  recognizer.add('circle', circle);
  recognizer.add('chevron-left', chevronLeft);
  recognizer.add('chevron-right', chevronRight);

  return (
    <Paper
      elevation={4}
      style={{
        position: 'relative',
        backgroundColor: '#F7F77E',
        minWidth: '300px',
        minHeight: '150px',
      }}
    >
      <h3 className="title-postit">{`${index}. ${postit.title}`}</h3>
      <p>
        { postit.text }
        -
        {index}
      </p>
      <Canvas drawing={drawing} index={index} recognizer={recognizer} />
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
          dispatch(deletePostit({ id: parseInt(id, 10), idToDelete: index }, { propagate: true }));
        }}
      >
        <DeleteIcon size="small" />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '60px',
        }}
        onClick={() => {
          dispatch(resetDrawPoint({
            board: parseInt(id, 10) + 1,
            index,
          }, { propagate: true }));
        }}
      >
        <EraserIcon style={{
          width: '50%',
          height: '50%',
        }}
        />
      </Fab>
    </Paper>
  );
}

Postit.propTypes = {
  postit: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default Postit;
