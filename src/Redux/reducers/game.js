import { SCORE, CHARGE_QUESTION } from '../actions';

const initialState = {
  score: 0,
  questions: [],
  currentAnswersRandomized: [],
};

function game(state = initialState, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      ...action.payload,
    };
  case CHARGE_QUESTION:
    return {
      ...state,
      questions: action.payload.questions,
    };
  default:
    return state;
  }
}

export default game;
