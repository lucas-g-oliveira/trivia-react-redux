import { SCORE, RIGHT_QUESTION } from '../actions';

const initialState = {
  score: 0,
  questions: [],
  currentAnswersRandomized: [],
  assertions: 0,
};

function player(state = initialState, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case RIGHT_QUESTION:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default:
    return state;
  }
}

export default player;
