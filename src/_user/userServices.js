import axios from 'axios';
import API from '../_api';
import authHeader from '../_helpers/authHeader';
import handleError from '../_helpers/handleError';

const userServices = {
  login: (username, password) => {
    const data = { username, password };
    const config = { headers: { 'Content-Type': 'application/json' } };
  
    return axios.post(API.USERS.LOGIN, data, config)
      .then(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page resfreshes
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      })
      .catch(error => handleError(error));
  },
  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  },
  register: (user) => {
    const data = user;
    const config = { headers: { 'Content-Type': 'application/json' } };
  
    /* return axios.post(API.USERS.REGISTER, data, config) */
    return axios.post(`https://httpbin.org/post`, data, config)
      .then(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page resfreshes
          localStorage.setItem('user', JSON.stringify(user));
        }
        if (user.data.data) {
          localStorage.setItem('user', JSON.stringify(user.data.data));
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
