import { API_URL } from '../_config';

const API = {
  USERS: {
    LOGIN: `http://localhost:5000/api/users/login`,
    REGISTER: `http://localhost:5000/api/users/register`,
    UPDATE: `http://localhost:5000/api/users/update`,
    DELETE: `http://localhost:5000/api/users/delete`
  },
  HOME: {
    CONTENT: `http://localhost:5000/api/home/content`,
    LATEST_NEWS: `http://localhost:5000/api/home/latest_news`,
    POPULAR_NEWS: `${API_URL}/5b8be84a3ffac56f4bd8e1e4/3`
  },
  CATEGORY: {
    CONTENT: `${API_URL}/5b9603d7ab9a186eafe7f8ab/4`,
    LATEST_NEWS: `http://localhost:5000/api/category/latest_news`,
    POPULAR_NEWS: `${API_URL}/5b8be84a3ffac56f4bd8e1e4/3`
  },
  NEWS_DETAIL: {
    CONTENT: `${API_URL}/5b8fddc83ffac56f4bda6cdb/6`
  },
  PROFILE: {
    CONTENT: `${API_URL}/5b97a3b6d6fe677c48d8a264/3`,
    ARTICLES: `${API_URL}/5b9cfd2e0fbf2833e2259ac3/1`,
    APPLAUSE: `${API_URL}/5b9d128a1bf1ca33b06b6e32`,
    FOLLOWING: `${API_URL}/5b9cfd2e0fbf2833e2259ac3/1`,
    FOLLOWERS: `${API_URL}/5b9d128a1bf1ca33b06b6e32`
  },
  HEADER: {
    CONTENT: 'https://jsonplaceholder.typicode.com/users'
  }
};

export default API;
