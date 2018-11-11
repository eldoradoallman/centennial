import Services from '../Services';

export const types = {
  GET_ALL_ARTICLES: 'GET_ALL_ARTICLES',
  GET_ALL_ARTICLES_PENDING: 'GET_ALL_ARTICLES_PENDING',
  GET_ALL_ARTICLES_REJECTED: 'GET_ALL_ARTICLES_REJECTED',
  GET_ALL_ARTICLES_FULFILLED: 'GET_ALL_ARTICLES_FULFILLED',
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
  getArticlesPending: false,
  getArticlesRejected: false,
  getArticlesFulfilled: false,
  addArticlePending: false,
  addArticleRejected: false,
  addArticleFulfilled: false,
  removeArticlePending: false,
  removeArticleRejected: false,
  removeArticleFulfilled: false,
  bookmarksList: [],
  per: 10,
  page: 1,
  has_more: true
};

export const actions = {
  getBookmarksList: (api_url, cancelToken) => ({
    type: types.GET_ALL_ARTICLES,
    payload: Services.bookmarks.getBookmarksList(api_url, cancelToken)
  }),
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
    case types.GET_ALL_ARTICLES_PENDING:
      return { ...state, getArticlesPending: true, getArticlesRejected: false, getArticlesFulfilled: false };
    case types.GET_ALL_ARTICLES_REJECTED:
      return { ...state, getArticlesPending: false, getArticlesRejected: true };
    case types.GET_ALL_ARTICLES_FULFILLED:
      return { ...state,
        getArticlesPending: false,
        getArticlesFulfilled: true,
        bookmarksList: action.payload.content.latest_news,
        page: action.payload.content.page,
        has_more: action.payload.content.has_more
      };
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
      return { ...state, removeArticlePending: false, removeArticleFulfilled: true, bookmarksList: action.payload.content };
    default:
      return state;
  }
};

export default bookmarksReducer;
