export const types = {
  TOGGLE_SIDEBAR_MENU: 'TOGGLE_SIDEBAR_MENU',
  CLOSE_SIDEBAR_MENU: 'CLOSE_SIDEBAR_MENU'
};

export const initialState = {
  isSidebarOpen: false
};

export const actions = {
  toggleSidebarMenu: () => ({
    type: types.TOGGLE_SIDEBAR_MENU
  }),
  closeSidebarMenu: () => ({
    type: types.CLOSE_SIDEBAR_MENU,
    payload: false
  })
};

const sidebarMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR_MENU:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case types.CLOSE_SIDEBAR_MENU:
      return { ...state, isSidebarOpen: action.payload };
    default:
      return state;
  }
};

export default sidebarMenuReducer;
