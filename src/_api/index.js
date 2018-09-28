import { API_URL } from '../_config';

const API = {
  USERS: {
    LOGIN: `${API_URL}/users/login`,
    REGISTER: `${API_URL}/users/register`,
    UPDATE: `${API_URL}/users/update`,
    DELETE: `${API_URL}/users/delete`
  },
  HOME: {
    CONTENT: `${API_URL}/home/content`,
    LATEST_NEWS: `${API_URL}/home/latest_news`,
    POPULAR_NEWS: `${API_URL}/home/popular_news`
  },
  CATEGORY: {
    CONTENT: `${API_URL}/category/content`,
    LATEST_NEWS: `${API_URL}/category/latest_news`,
    POPULAR_NEWS: `${API_URL}/category/popular_news`
  },
  NEWS_DETAIL: {
    CONTENT: `${API_URL}/news_detail/content`
  },
  PROFILE: {
    CONTENT: `${API_URL}/profile/content`,
    ARTICLES: `${API_URL}/profile/articles`,
    APPLAUSES: `${API_URL}/profile/applauses`,
    FOLLOWING: `${API_URL}/profile/articles`,
    FOLLOWERS: `${API_URL}/profile/applauses`
  }
};

export default API;
