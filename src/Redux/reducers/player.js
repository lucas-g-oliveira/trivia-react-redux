import { SCORE } from '../actions';

const initialState = {
  score: 0,
  questions: [],
  currentAnswersRandomized: [],
};

function player(state = initialState, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
