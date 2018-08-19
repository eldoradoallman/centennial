export const types = {
  CHANGE_TOPICS: 'CHANGE_TOPICS'
};

export const initialState = [];

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.CHANGE_TOPICS:
          return [ ...state, action.payload ];
      default:
          return state;
  }
};

export default topicsReducer;
