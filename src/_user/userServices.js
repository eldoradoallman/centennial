import axios from 'axios';

import API from '../_api';
import { setAuthHeader, logger } from '../Functions';

const userServices = {
  login: async (cancelToken, payload, callback, callbackalt) => {
    const payloadData = payload;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.post(`${API.USERS}/login`, payloadData, config);
      // login successful if there's a jwt token in the response
      if (data.token) {
        logger(() => console.log(data));
        let smallAvatar = encodeURI(data.avatar.small);
        let mediumAvatar = encodeURI(data.avatar.medium);
        data.avatar.small = smallAvatar;
        data.avatar.medium = mediumAvatar;
        // store user details and jwt token in local storage to keep user logged in between page resfreshes
        localStorage.setItem('token', JSON.stringify(data));
        if (callback) {
          setTimeout(callback, 4000);
        }
        if (callbackalt) {
          callbackalt();
        }
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  },
  register: async (cancelToken, payload, callback, callbackalt) => {
    const payloadData = payload;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelToken
    };

    try {
      const { data } = await axios.post(`${API.USERS}/register`, payloadData, config);
      callback();
      callbackalt();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: (user) => {
    const data = user;
    const config = { headers: { ...setAuthHeader(), 'Content-Type': 'application/json' } };
    
    return axios.put(`${API.USERS}/update`, data, config).catch(error => logger(() => console.log(error)));
  },
  delete: (id) => {
    const config = { headers: setAuthHeader() };
  
    return axios.delete(`${API.USERS}/delete`, config).catch(error => logger(() => console.log(error)));
  }
};

export default userServices;
