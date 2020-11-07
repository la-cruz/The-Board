import io from 'socket.io-client';
import { SET_BOARD } from '../actions/index';

const propagateSocket = () => (next) => (action) => {
  const socket = io();

  if (action.type === SET_BOARD) {
    if (action.meta.propagate) {
      socket.emit('action', { type: 'set_board', value: action.index });
    } else {
      const oldUrl = window.location.hash.split('/');
      let newUrl = `#/board/${action.index}`;

      if (oldUrl[3]) {
        newUrl += `/${oldUrl[3]}`;
      }

      window.location = newUrl;
    }
  }

  next(action);
};

export default propagateSocket;
