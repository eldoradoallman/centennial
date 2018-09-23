import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as userAuthActions } from '../_user/userAuthDucks';
import { actions as loginPopupActions } from './LoginPopupDucks';
import LoginPopupComponent from './LoginPopupComponent';

import './LoginPopup.css';

class ConnectedLoginPopup extends Component {

  render() {
    return (
      <LoginPopupComponent {...this.props} />
    );
  }
}

ConnectedLoginPopup.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoginPopupOpen: PropTypes.bool.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  closeLoginPopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.userAuth,
  ...state.loginPopup
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...userAuthActions,
    ...loginPopupActions
  }, dispatch)
});

const LoginPopup = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPopup);

export default LoginPopup;
