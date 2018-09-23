import userServices from '../_user/userServices';

const handleError = (response) => {
  userServices.logout();
  return Promise.reject(response.message || response.statusText);
};

export default handleError;
