import axios from 'axios';
import API from '../../_api';

export const types = {
  FETCH_LATEST_NEWS: 'FETCH_LATEST_NEWS',
  FETCH_LATEST_NEWS_PENDING: 'FETCH_LATEST_NEWS_PENDING',
  FETCH_LATEST_NEWS_REJECTED: 'FETCH_LATEST_NEWS_REJECTED',
  FETCH_LATEST_NEWS_FULFILLED: 'FETCH_LATEST_NEWS_FULFILLED'
};

export const initialState = {
  latestNewsFetching: false,
  latestNewsFetched: false,
  latestNewsError: null,
  latestNews: []
};

export const actions = {
  fetchLatestNewsContent: () => ({
    type: types.FETCH_LATEST_NEWS,
    payload: axios.get(API.HOME.LATEST_NEWS)
  })
};

const latestNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LATEST_NEWS_PENDING:
      return { ...state, latestNewsFetching: true };
    case types.FETCH_LATEST_NEWS_REJECTED:
      return { ...state, latestNewsFetching: false, latestNewsError: action.payload };
    case types.FETCH_LATEST_NEWS_FULFILLED:
      return { ...state, latestNewsFetching: false, latestNewsFetched: true, latestNews: action.payload.data };
    default:
      return state;
  }
};

export default latestNewsReducer;
