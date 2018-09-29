import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import userAuthReducer from '../_user/userAuthDucks';
import sidebarMenuReducer from '../common/sidebarmenu/SidebarMenuDucks';
import loginPopupReducer from '../loginpopup/LoginPopupDucks';

const appReducer = combineReducers({
  userAuth: userAuthReducer,
  sidebarMenu: sidebarMenuReducer,
  loginPopup: loginPopupReducer
});

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(appReducer, middleware);

store.subscribe(() => store.getState());

export default store;
