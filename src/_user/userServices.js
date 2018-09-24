import axios from 'axios';
import API from '../_api';
import authHeader from '../_helpers/authHeader';
import handleError from '../_helpers/handleError';

const userServices = {
  login: (user, callback, callbackalt) => {
    const data = user;
    const config = { headers: { 'Content-Type': 'application/json' } };
  
    return axios.post(API.USERS.LOGIN, data, config)
      .then(user => {
        // login successful if there's a jwt token in the response
        if (user.data.token) {
          // store user details and jwt token in local storage to keep user logged in between page resfreshes
          localStorage.setItem('token', user.data.token);
          if (callback) {
            setTimeout(callback, 2000);
          }
          if (callbackalt) {
            setTimeout(callbackalt, 2000);
          }
        }
        return user;
      })
      .catch(error => handleError(error));
  },
  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  },
  register: (user, callback, callbackalt) => {
    const data = user;
    const config = { headers: { 'Content-Type': 'application/json' } };
  
    return axios.post(API.USERS.REGISTER, data, config)
      .then(user => {
        if (user.data && callback) {
          setTimeout(callback, 2000);
        }
        if (user.data && callbackalt) {
          setTimeout(callbackalt, 2000);
        }
        return user;
      })
      .catch(error => handleError(error));
  },
  update: (user) => {
    const data = user;
    const config = { headers: { ...authHeader(), 'Content-Type': 'application/json' } };
    
    return axios.put(API.USERS.UPDATE, data, config).catch(error => handleError(error));
  },
  delete: (id) => {
    const config = { headers: authHeader() };
  
    return axios.delete(API.USERS.DELETE, config).catch(error => handleError(error));
  }
};

export default userServices;
