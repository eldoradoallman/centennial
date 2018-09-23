export const types = {
  OPEN_LOGIN_POPUP: 'OPEN_LOGIN_POPUP',
  CLOSE_LOGIN_POPUP: 'CLOSE_LOGIN_POPUP'
};

export const initialState = {
  isLoginPopupOpen: false
};

export const actions = {
  openLoginPopup: () => ({
    type: types.OPEN_LOGIN_POPUP
  }),
  closeLoginPopup: () => ({
    type: types.CLOSE_LOGIN_POPUP
  })
};

const loginPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_LOGIN_POPUP:
      document.body.style.overflow = 'hidden';
      return { ...state, isLoginPopupOpen: true };
    case types.CLOSE_LOGIN_POPUP:
      document.body.style.overflow = '';
      return { ...state, isLoginPopupOpen: false };
    default:
      return state;
  }
};

export default loginPopupReducer;
