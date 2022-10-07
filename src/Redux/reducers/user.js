export const LOGIN = 'LOGIN';
const initialState = {
  email: '',
  nome: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return action.value;
  default:
    return state;
  }
}

export default user;
