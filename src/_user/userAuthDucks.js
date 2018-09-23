import userServices from './userServices';

const user = localStorage.getItem('token');

export const types = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_REQUEST_PENDING: 'REGISTER_REQUEST_PENDING',
  REGISTER_REQUEST_REJECTED: 'REGISTER_REQUEST_REJECTED',
  REGISTER_REQUEST_FULFILLED: 'REGISTER_REQUEST_FULFILLED',

  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_REQUEST_PENDING: 'LOGIN_REQUEST_PENDING',
  LOGIN_REQUEST_REJECTED: 'LOGIN_REQUEST_REJECTED',
  LOGIN_REQUEST_FULFILLED: 'LOGIN_REQUEST_FULFILLED',

  LOGOUT: 'LOGOUT'
};

export const initialState = user ? {
  registering: false,
  loggingIn: false,
  loggedIn: true,
  error: null,
  user
} : {
  registering: false,
  loggingIn: false,
  loggedIn: false,
  error: null,
  user: null
};

export const actions = {
  register: (user) => ({
    type: types.REGISTER_REQUEST,
    payload: userServices.register(user)
  }),
  login: (user) => ({
    type: types.LOGIN_REQUEST,
    payload: userServices.login(user)
  }),
  logout: () => ({
    type: types.LOGOUT,
    payload: userServices.logout()
  })
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST_PENDING:
      return { ...state, registering: true, error: null, user: null };
    case types.REGISTER_REQUEST_REJECTED:
      return { ...state, registering: false, error: actions.payload, user: null };
    case types.REGISTER_REQUEST_FULFILLED:
      return { ...state, registering: false, error: null, user: action.payload.data };
    
    case types.LOGIN_REQUEST_PENDING:
      return { ...state, loggingIn: true, loggedIn: false, error: null, user: null };
    case types.LOGIN_REQUEST_REJECTED:
      return { ...state, loggingIn: false, loggedIn: false, error: actions.payload, user: null };
    case types.LOGIN_REQUEST_FULFILLED:
      return { ...state, loggingIn: false, loggedIn: true, error: null, user: action.payload.data };

    case types.LOGOUT:
      return { ...state, registering: false, loggingIn: false, loggedIn: false, error: null, user: null };
    default:
      return state;
  }
};

export default userAuthReducer;
