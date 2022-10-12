export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';
export const CHARGE_QUESTION = 'CHARGE_QUESTION';

export const actionLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionScore = (payload) => ({
  type: SCORE,
  payload,
});

export const chargeQuestions = (payload) => ({
  type: CHARGE_QUESTION,
  payload,
});
