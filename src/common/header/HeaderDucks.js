import axios from 'axios';
import API from '../../_api';

export const types = {
  FETCH_HEADER_CONTENT: 'FETCH_HEADER_CONTENT',
  FETCH_HEADER_CONTENT_PENDING: 'FETCH_HEADER_CONTENT_PENDING',
  FETCH_HEADER_CONTENT_REJECTED: 'FETCH_HEADER_CONTENT_REJECTED',
  FETCH_HEADER_CONTENT_FULFILLED: 'FETCH_HEADER_CONTENT_FULFILLED'
};

export const initialState = {
  headerFetching: false,
  headerFetched: false,
  headerError: null,
  users: []
};

export const actions = {
  fetchHeaderContent: () => ({
    type: types.FETCH_HEADER_CONTENT,
    payload: axios.get(API.HEADER.CONTENT)
  })
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HEADER_CONTENT_PENDING:
      return { ...state, headerFetching: true };
    case types.FETCH_HEADER_CONTENT_REJECTED:
      return { ...state, headerFetching: false, headerError: action.payload };
    case types.FETCH_HEADER_CONTENT_FULFILLED:
      return { ...state, headerFetching: false, headerFetched: true, users: action.payload.data };
    default:
      return state;
  }
};

export default headerReducer;
