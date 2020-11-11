import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDrawPoint } from '../../actions/index';

function Canvas({ drawing, index, recognizer }) {
  const { clickX, clickY, clickDrag } = drawing;
  const { id } = useParams();
  const dispatch = useDispatch();
  let gesturePoint = [];
  let paint = false;

  // Si vous utilisez des Class Components plutôt que des function Components, voir ici https://stackoverflow.com/a/54620836
  const canvasRef = useRef(null);

  const addClick = (x, y, dragging) => {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  };

  function redraw() {
    const context = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current.getBoundingClientRect();

    // Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    canvasRef.current.setAttribute('width', width);
    canvasRef.current.setAttribute('height', height);
    context.clearRect(0, 0, context.width, context.height); // Clears the canvas

    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    for (let i = 0; i < clickX.length; i += 1) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height);
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height);
      }
      context.lineTo(clickX[i] * width, clickY[i] * height);
      context.closePath();
      context.stroke();
    }
  }

  function pointerDownHandler(ev) {
    // if (ev.pointerType === 'mouse') {
    //   return;
    // }

    const {
      width,
      height,
      top,
      left,
    } = canvasRef.current.getBoundingClientRect();

    paint = true;

    if (ev.pointerType === 'mouse') {
      gesturePoint.push([(ev.pageX - left) / width, (ev.pageY - top) / height]);
    } else {
      addClick(
        (ev.pageX - left) / width,
        (ev.pageY - top) / height,
        false,
      );
      redraw();
    }
  }

  function pointerMoveHandler(ev) {
    if (paint) {
      const {
        width,
        height,
        top,
        left,
      } = canvasRef.current.getBoundingClientRect();

      if (ev.pointerType === 'mouse') {
        gesturePoint.push([(ev.pageX - left) / width, (ev.pageY - top) / height]);
      } else {
        addClick(
          (ev.pageX - left) / width,
          (ev.pageY - top) / height,
          true,
        );
        redraw();
      }
    }
  }

  function pointerUpEvent(ev) {
    paint = false;
    if (ev.pointerType === 'mouse') {
      // TODO recognizer.check(gesturePoint)
      gesturePoint = [];
    } else {
      dispatch(addDrawPoint({
        clickX,
        clickY,
        clickDrag,
        board: parseInt(id, 10) + 1,
        index,
      }, {
        propagate: true,
      }));
    }
  }

  useEffect(() => {
    redraw();
  }, [drawing]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpEvent}
    />
  );
}

Canvas.propTypes = {
  drawing: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  recognizer: PropTypes.instanceOf(Object).isRequired,
};

export default Canvas;
