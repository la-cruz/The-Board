export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_POSTIT = 'CREATE_POSTIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const SET_POSTIT = 'SET_POSTIT';

export const createBoard = (payload) => ({
  type: CREATE_BOARD,
  payload,
});

export const deleteBoard = (id) => ({
  type: DELETE_BOARD,
  id,
});

export const setBoard = (index) => ({
  type: SET_BOARD,
  index,
});

export const createPostit = (payload) => ({
  type: CREATE_POSTIT,
  payload,
});

export const deletePostit = (payload) => ({
  type: DELETE_POSTIT,
  payload,
});
