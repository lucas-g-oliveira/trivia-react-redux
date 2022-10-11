export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';

export const actionLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionScore = (payload) => ({
  type: SCORE,
  payload,
});
