import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPopupComponent = ({
    loggedIn,
    error,
    login,
    isLoginPopupOpen,
    closeLoginPopup
  }) => isLoginPopupOpen ? (
    <div id="login-popup">
      <div id="login-popup-wrapper">
        <div id="login-popup-box">
          <button onClick={closeLoginPopup} id="close-login-popup" className="main-button">CLOSE</button>
          {
            !loggedIn ?
            <React.Fragment>
              <p>LOGIN POPUP</p>
              <button
                id="login-button"
                className="black-button main-button"
                onClick={
                  () => login({ username: 'duaneallman', email: 'duane@gmail.com', password: 'duane1986' }, closeLoginPopup)
                }
              >LOGIN</button>
            </React.Fragment>
            : error ? 'Login Gagal'
            : 'Login Berhasil'
          }
        </div>
      </div>
    </div>
) : '';

export default LoginPopupComponent;
