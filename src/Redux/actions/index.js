export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';
export const CHARGE_QUESTION = 'CHARGE_QUESTION';
export const RIGHT_QUESTION = 'RIGHT_QUESTION';

export const actionLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionScore = (difficulty, timer) => {
  let score = 0;
  const dotConstant = 10;
  const hard = 3;
  const medium = 2;
  const easy = 1;
  switch (difficulty) {
  case 'hard':
    score += dotConstant + (timer * hard);
    break;
  case 'medium':
    score += dotConstant + (timer * medium);
    break;
  case 'easy':
    score += dotConstant + (timer * easy);
    break;
  default:
    break;
  }
  return ({
    type: SCORE,
    payload: score,

  });
};

export const chargeQuestions = (payload) => ({
  type: CHARGE_QUESTION,
  payload,
});

export const setCorrectAnswer = (payload) => ({
  type: RIGHT_QUESTION,
  payload,
});
