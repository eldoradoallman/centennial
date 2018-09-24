import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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
    console.log(this.state);
    return (
      <LoginPopupComponent {...this.props}
        state={this.state}
        onChange={this.onChange.bind(this)}
        resetForm={this.resetForm.bind(this)}
      />
    );
  }
}

ConnectedLoginPopup.propTypes = {
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
