export const CREATE_BOARD = 'CREATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const SET_BOARD = 'SET_BOARD';
export const CREATE_POSTIT = 'CREATE_POSTIT';
export const DELETE_POSTIT = 'DELETE_POSTIT';
export const SET_POSTIT = 'SET_POSTIT';
export const ADD_DRAW_POINT = 'ADD_DRAW_POINT';
export const RESET_DRAW_POINT = 'RESET_DRAW_POINT';

export const createBoard = (payload, meta) => ({
  type: CREATE_BOARD,
  payload,
  meta,
});

export const deleteBoard = (id, meta) => ({
  type: DELETE_BOARD,
  id,
  meta,
});

export const setBoard = (index, meta) => ({
  type: SET_BOARD,
  index,
  meta,
});

export const createPostit = (payload, meta) => ({
  type: CREATE_POSTIT,
  payload,
  meta,
});

export const deletePostit = (payload, meta) => ({
  type: DELETE_POSTIT,
  payload,
  meta,
});

export const addDrawPoint = (payload, meta) => ({
  type: ADD_DRAW_POINT,
  payload,
  meta,
});

export const resetDrawPoint = (payload, meta) => ({
  type: RESET_DRAW_POINT,
  payload,
  meta,
});
