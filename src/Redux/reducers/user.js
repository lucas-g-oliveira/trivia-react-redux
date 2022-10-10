import { LOGIN } from '../actions';

const initialState = {
  email: '',
  name: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default user;
