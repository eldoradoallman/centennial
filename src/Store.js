import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import userAuthReducer from './_user/userAuthDucks';
import bookmarksReducer from './bookmarks/BookmarksDucks';
import sidebarMenuReducer from './sidebarmenu/SidebarMenuDucks';
import loginPopupReducer from './loginpopup/LoginPopupDucks';

const appReducer = combineReducers({
  userAuth: userAuthReducer,
  bookmarks: bookmarksReducer,
  sidebarMenu: sidebarMenuReducer,
  loginPopup: loginPopupReducer
});

const middleware = applyMiddleware(promise(), thunk, logger);

const Store = createStore(appReducer, middleware);

Store.subscribe(() => Store.getState());

export default Store;
