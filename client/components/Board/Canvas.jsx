import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDrawPoint } from '../../actions/index';

function Canvas({ drawing, index, recognizer }) {
  const { clickX, clickY, clickDrag } = drawing;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let gesturePoint = [];
  let paint = false;
  let gesture = false;

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
    context.lineWidth = 3;

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

    if (gesture) {
      context.strokeStyle = '#1919FF';
      context.lineJoin = 'round';
      context.lineWidth = 7;

      context.beginPath();
      if (gesturePoint[0]) {
        context.moveTo(gesturePoint[0][0] * width, gesturePoint[0][1] * height);
        for (let i = 1; i < gesturePoint.length; i += 1) {
          context.lineTo(gesturePoint[i][0] * width - 1, gesturePoint[i][1] * height);
        }
      }

      context.stroke();
    }
  }

  function pointerDownHandler(ev) {
    if (ev.pointerType === 'mouse') {
      return;
    }

    const {
      width,
      height,
      top,
      left,
    } = canvasRef.current.getBoundingClientRect();

    if (ev.pointerType === 'touch') {
      paint = false;
      gesture = true;
      gesturePoint.push(
        [
          ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
          ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
        ],
      );
    } else if (ev.pointerType === 'pen') {
      gesture = false;
      paint = true;
      addClick(
        ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
        ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
        false,
      );
    }
    redraw();
  }

  function pointerMoveHandler(ev) {
    const {
      width,
      height,
      top,
      left,
    } = canvasRef.current.getBoundingClientRect();

    if (paint) {
      addClick(
        ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
        ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
        true,
      );
      redraw();
    } else if (gesture) {
      gesturePoint.push(
        [
          ((ev.pageX || ev.changedTouches[0].pageX) - left) / width,
          ((ev.pageY || ev.changedTouches[0].pageY) - top) / height,
        ],
      );
      redraw();
    }
  }

  function pointerUpEvent() {
    if (gesture) {
      const geste = recognizer.check(gesturePoint);
      if (geste.recognized) {
        switch (geste.name) {
          case 'chevron-left':
            history.push(`/board/${parseInt(id, 10)}/${index - 1}`);
            break;
          case 'chevron-right':
            history.push(`/board/${parseInt(id, 10)}/${index + 1}`);
            break;
          default:
            break;
        }
      }
      gesturePoint = [];
      redraw();
    } else if (paint) {
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

    paint = false;
    gesture = false;
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
      onTouchStart={pointerDownHandler}
      onTouchMove={pointerMoveHandler}
      onTouchEnd={pointerUpEvent}
    />
  );
}

Canvas.propTypes = {
  drawing: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  recognizer: PropTypes.instanceOf(Object).isRequired,
};

export default Canvas;
