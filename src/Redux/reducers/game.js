import { SCORE } from '../actions';

const initialState = {
  score: 0,
};

function game(state = initialState, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default game;
