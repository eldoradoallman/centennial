import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPopupComponent = ({
    loggedIn,
    error,
    login,
    logout,
    isLoginPopupOpen,
    closeLoginPopup
  }) => isLoginPopupOpen ? (
    <div id="login-popup">
      <div id="login-popup-wrapper">
        <div id="login-popup-box">
          <button onClick={() => {
            closeLoginPopup();
            if (error) {
              logout();
            }
          }} id="close-login-popup" className="main-button">CLOSE</button>
          {
            !loggedIn && !error ?
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
            :
            error ?
              <div>
                <p>Login Gagal</p>
                <p>{error}</p>
              </div>
            : 'Login Berhasil'
          }
        </div>
      </div>
    </div>
) : '';

export default LoginPopupComponent;
