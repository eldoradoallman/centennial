import axios from 'axios';

import Functions from './Functions';
import userServices from './_user/userServices';
import BookmarksServices from './bookmarks/BookmarksServices';

const Services = {
  fetchContent: async (api_url, cancelToken) => {
    const config = {
      headers: { ...Functions.setAuthHeader(), 'Content-Type': 'application/json' },
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.post(api_url, {}, config);
      return data;
    } catch (error) {
      throw error;
    }
  },
  user: userServices,
  bookmarks: BookmarksServices
};

export default Services;
