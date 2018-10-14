import Services from '../Services';

export const types = {
  ADD_ARTICLE: 'ADD_ARTICLE',
  ADD_ARTICLE_PENDING: 'ADD_ARTICLE_PENDING',
  ADD_ARTICLE_REJECTED: 'ADD_ARTICLE_REJECTED',
  ADD_ARTICLE_FULFILLED: 'ADD_ARTICLE_FULFILLED',
  REMOVE_ARTICLE: 'REMOVE_ARTICLE',
  REMOVE_ARTICLE_PENDING: 'REMOVE_ARTICLE_PENDING',
  REMOVE_ARTICLE_REJECTED: 'REMOVE_ARTICLE_REJECTED',
  REMOVE_ARTICLE_FULFILLED: 'REMOVE_ARTICLE_FULFILLED'
};

export const initialState = {
  addArticlePending: false,
  addArticleRejected: false,
  addArticleFulfilled: false,
  removeArticlePending: false,
  removeArticleRejected: false,
  removeArticleFulfilled: false
};

export const actions = {
  addArticle: (payload, cancelToken) => ({
    type: types.ADD_ARTICLE,
    payload: Services.bookmarks.addArticle(payload, cancelToken)
  }),
  removeArticle: (payload, cancelToken) => ({
    type: types.REMOVE_ARTICLE,
    payload: Services.bookmarks.removeArticle(payload, cancelToken)
  })
};

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ARTICLE_PENDING:
      return { ...state, addArticlePending: true, addArticleRejected: false, addArticleFulfilled: false };
    case types.ADD_ARTICLE_REJECTED:
      return { ...state, addArticlePending: false, addArticleRejected: true };
    case types.ADD_ARTICLE_FULFILLED:
      return { ...state, addArticlePending: false, addArticleFulfilled: true };
    case types.REMOVE_ARTICLE_PENDING:
      return { ...state, removeArticlePending: true, removeArticleRejected: false, removeArticleFulfilled: false };
    case types.REMOVE_ARTICLE_REJECTED:
      return { ...state, removeArticlePending: false, removeArticleRejected: true };
    case types.REMOVE_ARTICLE_FULFILLED:
      return { ...state, removeArticlePending: false, removeArticleFulfilled: true };
    default:
      return state;
  }
};

export default bookmarksReducer;
