export const types = {
  OPEN_REGISTER_POPUP: 'OPEN_REGISTER_POPUP',
  OPEN_LOGIN_POPUP: 'OPEN_LOGIN_POPUP',
  CLOSE_LOGIN_POPUP: 'CLOSE_LOGIN_POPUP',
  GO_TO_REGISTER: 'GO_TO_REGISTER',
  GO_TO_LOGIN: 'GO_TO_LOGIN'
};

export const initialState = {
  isLoginPopupOpen: false,
  onLogin: false,
  onRegister: false
};

export const actions = {
  openRegisterPopup: () => ({
    type: types.OPEN_REGISTER_POPUP
  }),
  openLoginPopup: () => ({
    type: types.OPEN_LOGIN_POPUP
  }),
  closeLoginPopup: () => ({
    type: types.CLOSE_LOGIN_POPUP
  }),
  goToRegister: () => ({
    type: types.GO_TO_REGISTER
  }),
  goToLogin: () => ({
    type: types.GO_TO_LOGIN
  })
};

const loginPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_REGISTER_POPUP:
      document.body.style.overflow = 'hidden';
      return { ...state, isLoginPopupOpen: true, onLogin: false, onRegister: true };
    case types.OPEN_LOGIN_POPUP:
      document.body.style.overflow = 'hidden';
      return { ...state, isLoginPopupOpen: true, onLogin: true, onRegister: false };
    case types.CLOSE_LOGIN_POPUP:
      document.body.style.overflow = '';
      return { ...state, isLoginPopupOpen: false, onLogin: false, onRegister: false };
    case types.GO_TO_REGISTER:
      return { ...state, onLogin: false, onRegister: true };
    case types.GO_TO_LOGIN:
      return { ...state, onLogin: true, onRegister: false };
    default:
      return state;
  }
};

export default loginPopupReducer;
