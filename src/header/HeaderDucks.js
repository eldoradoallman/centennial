import axios from 'axios';
import api from '../api';

export const types = {
  FETCH_HOME_CONTENT: 'FETCH_HOME_CONTENT',
  FETCH_HOME_CONTENT_PENDING: 'FETCH_HOME_CONTENT_PENDING',
  FETCH_HOME_CONTENT_REJECTED: 'FETCH_HOME_CONTENT_REJECTED',
  FETCH_HOME_CONTENT_FULFILLED: 'FETCH_HOME_CONTENT_FULFILLED'
};

export const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  users: []
};

export const actions = {
  fetchHeaderContent: () => ({
    type: types.FETCH_HOME_CONTENT,
    payload: axios.get(api.home.content)
  }),
  getUserData: () => ({
    type: 'CLICK_BUTTON',
    payload: console.log('the button has been clicked')
  })
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HOME_CONTENT_PENDING:
      return { ...state, fetching: true };
    case types.FETCH_HOME_CONTENT_REJECTED:
      return { ...state, fetching: false, error: action.payload };
    case types.FETCH_HOME_CONTENT_FULFILLED:
      return { ...state, fetching: false, fetched: true, users: action.payload.data };
    default:
      return state;
  }
};

export default headerReducer;