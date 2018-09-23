export const types = {
  OPEN_POPUP_LOGIN: 'OPEN_POPUP_LOGIN',
  CLOSE_POPUP_LOGIN: 'CLOSE_POPUP_LOGIN'
};

export const initialState = {
  isPopupLoginOpen: false
};

export const actions = {
  openPopupLogin: () => ({
    type: types.OPEN_POPUP_LOGIN
  }),
  closePopupLogin: () => ({
    type: types.CLOSE_POPUP_LOGIN
  })
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_POPUP_LOGIN:
      document.body.style.overflow = 'hidden';
      return { ...state, isPopupLoginOpen: true };
    case types.CLOSE_POPUP_LOGIN:
      document.body.style.overflow = '';
      return { ...state, isPopupLoginOpen: false };
    default:
      return state;
  }
};

export default loginReducer;
