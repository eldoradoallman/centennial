import axios from 'axios';
import API from '../_api';

export const types = {
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_AGE: 'CHANGE_AGE'
};

export const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  name: '',
  age: 0
};

export const actions = {
  changeName: (name) => ({
    type: types.CHANGE_NAME,
    payload: name
  }),
  changeAge: () => ({
    type: types.CHANGE_AGE
  })
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NAME:
      return { ...state, name: action.payload };
    case types.CHANGE_AGE:
      return { ...state, age: state.age + 1 };
    default:
      return state;
  }
};

export default aboutReducer;
