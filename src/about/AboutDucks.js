import axios from 'axios';
import api from '../api';

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
  changeAge: (age) => ({
    type: types.CHANGE_AGE,
    payload: 35
  })
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NAME:
      return { ...state, name: action.payload };
    case types.CHANGE_AGE:
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

export default aboutReducer;
