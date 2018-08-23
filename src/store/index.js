import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import headerReducer from '../header/HeaderDucks';
import homeReducer from '../home/HomeDucks';
import aboutReducer from '../about/AboutDucks';
import topicsReducer from '../topics/TopicsDucks';

const appReducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  about: aboutReducer,
  topics: topicsReducer
});

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(appReducer, middleware);

store.subscribe(() => store.getState());

export default store;
