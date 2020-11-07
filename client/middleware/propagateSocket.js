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
} from '../actions/index';

const propagateSocket = (storeAPI) => (next) => (action) => {
  const socket = io();
  const { dispatch } = storeAPI;

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

  socket.on('action', (params) => {
    switch (params.type) {
      case 'set_board':
        console.log('j\'ai reçu un setBoard');
        dispatch(setBoard(params.value, { propagate: false }));
        break;
      case 'create_board':
        console.log('j\'ai reçu un setBoard');
        dispatch(createBoard(params.value, { propagate: false }));
        break;
      case 'delete_board':
        dispatch(deleteBoard(params.value, { propagate: false }));
        break;
      case 'create_postit':
        dispatch(createPostit(params.value, { propagate: false }));
        break;
      case 'delete_postit':
        console.log('j\'ai reçu un deletePostit');
        dispatch(deletePostit(params.value, { propagate: false }));
        break;
      default:
        break;
    }
  });

  next(action);
};

export default propagateSocket;
