import axios from 'axios';

import API from '../_api';
import Functions from '../Functions';

const BookmarksServices = {
  addArticle: async (payload, cancelToken) => {
    const config = {
      headers: { ...Functions.setAuthHeader(), 'Content-Type': 'application/json' },
      data: payload,
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.put(`${API.BOOKMARKS}/addarticle`, {}, config);
      return data;
    } catch (error) {
      throw error;
    }
  },
  removeArticle: async (payload, cancelToken) => {
    const config = {
      headers: { ...Functions.setAuthHeader(), 'Content-Type': 'application/json' },
      data: payload,
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.delete(`${API.BOOKMARKS}/removearticle`, config);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default BookmarksServices;