import io from 'socket.io-client';
import {
  CREATE_BOARD,
  CREATE_POSTIT,
  DELETE_BOARD,
  DELETE_POSTIT,
  SET_BOARD,
  createBoard,
  createPostit,
  deleteBoard,
  deletePostit,
  setBoard,
  addDrawPoint,
  ADD_DRAW_POINT,
  resetDrawPoint,
  RESET_DRAW_POINT,
} from '../actions/index';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';

const socket = io();

const propagateSocket = () => (next) => (action) => {
  if (action.meta.propagate) {
    switch (action.type) {
      case SET_BOARD:
        socket.emit('action', { type: 'set_board', value: action.index });
        break;
      case CREATE_BOARD:
        socket.emit('action', { type: 'create_board', value: action.payload });
        break;
      case DELETE_BOARD:
        socket.emit('action', { type: 'delete_board', value: action.id });
        break;
      case CREATE_POSTIT:
        socket.emit('action', { type: 'create_postit', value: action.payload });
        break;
      case DELETE_POSTIT:
        socket.emit('action', { type: 'delete_postit', value: action.payload });
        break;
      case ADD_DRAW_POINT:
        socket.emit('action', { type: 'add_draw_point', value: action.payload });
        break;
      case RESET_DRAW_POINT:
        socket.emit('action', { type: 'reset_draw_point', value: action.payload });
        break;
      default:
        break;
    }
  } else if (action.type === SET_BOARD) {
    const oldUrl = window.location.hash.split('/');
    let newUrl = `#/board/${action.index}`;

    if (oldUrl[3]) {
      newUrl += `/${oldUrl[3]}`;
    }

    window.location = newUrl;
  }

  next(action);
};

socket.on('action', (params) => {
  switch (params.type) {
    case 'set_board':
      store.dispatch(setBoard(params.value, { propagate: false }));
      break;
    case 'create_board':
      store.dispatch(createBoard(params.value, { propagate: false }));
      break;
    case 'delete_board':
      store.dispatch(deleteBoard(params.value, { propagate: false }));
      break;
    case 'create_postit':
      store.dispatch(createPostit(params.value, { propagate: false }));
      break;
    case 'delete_postit':
      store.dispatch(deletePostit(params.value, { propagate: false }));
      break;
    case 'add_draw_point':
      store.dispatch(addDrawPoint(params.value, { propagate: false }));
      break;
    case 'reset_draw_point':
      store.dispatch(resetDrawPoint(params.value, { propagate: false }));
      break;
    default:
      break;
  }
});

export default propagateSocket;
