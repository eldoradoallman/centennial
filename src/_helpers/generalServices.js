import axios from 'axios';
import authHeader from './authHeader';
import handleError from './handleError';

const generalServices = {
  fetchContent: (api_url) => {
    const config = { headers: { ...authHeader(), 'Content-Type': 'application/json' } };
    
    return axios.post(api_url, {}, config).catch(error => handleError(error));
  }
};

export default generalServices;
