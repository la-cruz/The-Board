import {
  CREATE_POSTIT,
  DELETE_POSTIT,
  CREATE_BOARD,
  DELETE_BOARD,
  SET_BOARD,
} from '../actions/index';
import data from '../data/data.json';

const initialState = {
  index: 1, // initialise votre presentation au mur 1
  boards: data, // vous pouvez réutiliser votre état de murs initial.
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POSTIT:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, action.payload.id),
          {
            ...state.boards[action.payload.id],
            postits: state.boards[action.payload.id].postits
              .filter((_, index) => index !== action.payload.idToDelete),
          },
          ...state.boards.slice(action.payload.id + 1, state.boards.length),
        ],
      };
    case CREATE_POSTIT:
      return {
        ...state,
        boards: [
          ...state.boards.slice(0, action.payload.board - 1),
          {
            ...state.boards[action.payload.board - 1],
            postits: [
              ...state.boards[action.payload.board - 1].postits,
              {
                type: action.payload.type,
                board: action.payload.board,
                title: action.payload.title,
                text: action.payload.text,
                visible: action.payload.visible,
                color: action.payload.color,
              },
            ],
          },
          ...state.boards.slice(action.payload.board, state.boards.length),
        ],
      };
    case CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, {
          type: 'board', id: state.boards.length + 1, title: action.payload.title, active: true, notes: action.payload.notes, postits: [],
        }],
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.id),
      };
    case SET_BOARD:
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

export default rootReducer;
