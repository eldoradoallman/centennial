import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './App';
import homeReducer from './home/HomeDucks';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_AGE = 'CHANGE_AGE';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        case CHANGE_AGE:
            return { ...state, age: action.payload };
        default:
            return state;
    }
};

const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        case CHANGE_AGE:
            return [ ...state, action.payload ];
        default:
            return state;
    }
};

const appReducer = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    home: homeReducer
});

const middleware = applyMiddleware(promise(), thunk, logger);

const store = createStore(appReducer, middleware);

store.subscribe(() => store.getState());

store.dispatch({
    type: CHANGE_NAME,
    payload: 'Steffen'
});
store.dispatch({
    type: CHANGE_AGE,
    payload: 32
});
store.dispatch({
    type: CHANGE_AGE,
    payload: 45
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
