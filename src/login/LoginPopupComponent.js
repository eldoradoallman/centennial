import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as loginActions } from './LoginDucks';
import { actions as userAuthActions } from '../_user/userAuthDucks';

import './LoginPopup.css';

const ConnectedLoginPopupComponent = ({
    loggedIn,
    error,
    login,
    isPopupLoginOpen,
    closePopupLogin
  }) => isPopupLoginOpen ? (
    <div id="login-popup">
      <div id="login-popup-wrapper">
        <div id="login-popup-box">
          <button onClick={closePopupLogin} id="close-login-popup" className="main-button">CLOSE</button>
          {
            !loggedIn ?
            <React.Fragment>
              <p>LOGIN POPUP</p>
              <button
                id="login-button"
                className="black-button main-button"
                onClick={
                  () => login({ username: 'duaneallman', email: 'duane@gmail.com', password: 'duane1986' }, closePopupLogin)
              }>LOGIN</button>
            </React.Fragment>
            : error ? 'Login Gagal'
            : 'Login Berhasil'
          }
        </div>
      </div>
    </div>
) : '';

ConnectedLoginPopupComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  login: PropTypes.func.isRequired,
  isPopupLoginOpen: PropTypes.bool.isRequired,
  openPopupLogin: PropTypes.func.isRequired,
  closePopupLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.userAuth,
  ...state.login
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...userAuthActions,
    ...loginActions
  }, dispatch)
});

const LoginPopupComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPopupComponent));

export default LoginPopupComponent;
