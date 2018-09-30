import axios from 'axios';
import authHeader from './authHeader';

const generalServices = {
  fetchContents: async (api_url, cancelToken) => {
    const config = {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.post(api_url, {}, config);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default generalServices;
