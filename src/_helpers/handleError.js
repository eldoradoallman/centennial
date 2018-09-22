import userServices from '../_user/userServices';

const handleError = (response) => {
  if (response.status === 401) {
    // auto logout if 401 response returned from api
    userServices.logout();
    /* location.reload(true); */
  }
  return response.message || response.statusText;
};

export default handleError;
