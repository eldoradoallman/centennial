import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
/* import axios from 'axios'; */
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_AGE = 'CHANGE_AGE';
const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';
const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';

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

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_PENDING:
            return { ...state, fetching: true };
        case FETCH_USERS_REJECTED:
            return { ...state, fetching: false, error: action.payload };
        case FETCH_USERS_FULFILLED:
            return { ...state, fetching: false, fetched: true, users: action.payload.data };
        default:
            return state;
    }
};

const appReducer = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    users: usersReducer
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
/* store.dispatch({
    type: 'FETCH_USERS',
    payload: axios.get("https://jsonplaceholder.typicode.com/users")
}); */

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
