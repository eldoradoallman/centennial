import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import userAuthReducer from '../_user/userAuthDucks';
import sidebarMenuReducer from '../common/sidebarmenu/SidebarMenuDucks';
import headerReducer from '../common/header/HeaderDucks';
import homeReducer from '../home/HomeDucks';
import latestNewsReducer from '../common/latestnews/LatestNewsDucks';
import aboutReducer from '../about/AboutDucks';
import topicsReducer from '../topics/TopicsDucks';

const appReducer = combineReducers({
  userAuth: userAuthReducer,
  sidebarMenu: sidebarMenuReducer,
  header: headerReducer,
  home: homeReducer,
  latestNews: latestNewsReducer,
  about: aboutReducer,
  topics: topicsReducer
});

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(appReducer, middleware);

store.subscribe(() => store.getState());

export default store;
