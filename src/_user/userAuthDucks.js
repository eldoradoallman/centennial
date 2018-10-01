import Services from '../Services';

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
  registered: true,
  errorRegister: null,
  loggingIn: false,
  loggedIn: true,
  error: null,
  user
} : {
  registering: false,
  registered: false,
  errorRegister: null,
  loggingIn: false,
  loggedIn: false,
  error: null,
  user: null
};

export const actions = {
  register: (cancelToken, user, callback, callbackalt) => ({
    type: types.REGISTER_REQUEST,
    payload: Services.user.register(cancelToken, user, callback, callbackalt)
  }),
  login: (cancelToken, user, callback, callbackalt) => ({
    type: types.LOGIN_REQUEST,
    payload: Services.user.login(cancelToken, user, callback, callbackalt)
  }),
  logout: () => ({
    type: types.LOGOUT,
    payload: Services.user.logout()
  })
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST_PENDING:
      return { ...state, registering: true, registered: false, errorRegister: null, user: null };
    case types.REGISTER_REQUEST_REJECTED:
      return { ...state, registering: false, registered: false, errorRegister: action.payload.message, user: null };
    case types.REGISTER_REQUEST_FULFILLED:
      return { ...state, registering: false, registered: true, errorRegister: null, user: action.payload };
    
    case types.LOGIN_REQUEST_PENDING:
      return { ...state, loggingIn: true, loggedIn: false, error: null, user: null };
    case types.LOGIN_REQUEST_REJECTED:
      return { ...state, loggingIn: false, loggedIn: false, error: action.payload.message, user: null };
    case types.LOGIN_REQUEST_FULFILLED:
      return { ...state, loggingIn: false, loggedIn: true, error: null, user: action.payload };

    case types.LOGOUT:
      return { ...state, registering: false, registered: false, errorRegister: null, loggingIn: false, loggedIn: false, error: null, user: null };
    default:
      return state;
  }
};

export default userAuthReducer;
