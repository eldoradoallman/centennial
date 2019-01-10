import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { logger } from '../Functions';
import { actions as userAuthActions } from '../_user/userAuthDucks';
import { actions as loginPopupActions } from './LoginPopupDucks';
import LoginPopupComponent from './LoginPopupComponent';

import './LoginPopup.css';

class ConnectedLoginPopup extends Component {
  state = {
    loginUsernameEmail: '',
    loginPassword: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordConfirm: ''
  };
  
  signal = axios.CancelToken.source();
  
  submitLogin = async (payload, callback, callbackalt) => {
    try {
      this.setState({ fetching: true });
      await this.props.login(this.signal.token, payload, callback, callbackalt);
    } catch (error) {
      if (axios.isCancel(error)) {
        logger(() => console.log('Error: ', error.message));
      }
    }
  }

  submitRegister = async (payload, callback, callbackalt) => {
    try {
      this.setState({ fetching: true });
      await this.props.register(this.signal.token, payload, callback, callbackalt);
    } catch (error) {
      if (axios.isCancel(error)) {
        logger(() => console.log('Error: ', error.message));
      }
    }
  }

  onChange(event) {
    if (event.target.id === 'login-username-email') {
      this.setState({ loginUsernameEmail: event.target.value });
    } else if (event.target.id === 'register-email') {
      this.setState({ registerEmail: event.target.value });
    } else if (event.target.id === 'login-password') {
      this.setState({ loginPassword: event.target.value });
    } else if (event.target.id === 'register-password') {
      this.setState({ registerPassword: event.target.value });
    } else if (event.target.id === 'register-password-confirm') {
      this.setState({ registerPasswordConfirm: event.target.value });
    }
  }

  validatePayload(type) {
    const {
      loginUsernameEmail,
      loginPassword,
      registerEmail,
      registerPassword,
      registerPasswordConfirm
    } = this.state;

    if (type === 'login') {
      return {
        username_email: loginUsernameEmail,
        password: loginPassword
      };
    } else if (type === 'register') {
      return {
        email: registerEmail,
        password: registerPassword,
        password_confirm: registerPasswordConfirm
      };
    }
    return false;
  }

  resetForm() {
    this.setState({
      loginUsernameEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      registerPasswordConfirm: ''
    });
  }

  render() {
    return (
      <LoginPopupComponent {...this.props}
        onChange={this.onChange.bind(this)}
        validatePayload={this.validatePayload.bind(this)}
        resetForm={this.resetForm.bind(this)}
        submitLogin={this.submitLogin.bind(this)}
        submitRegister={this.submitRegister.bind(this)}
      />
    );
  }
}

ConnectedLoginPopup.propTypes = {
  registered: PropTypes.bool.isRequired,
  errorRegister: PropTypes.any,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoginPopupOpen: PropTypes.bool.isRequired,
  onLogin: PropTypes.bool.isRequired,
  onRegister: PropTypes.bool.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  closeLoginPopup: PropTypes.func.isRequired,
  goToRegister: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired
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
