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
          <a onClick={() => {
            closeLoginPopup();
            if (error) {
              logout();
            }
          }} id="close-login-popup"></a>
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
              <div id="login-message">
                <div id="login-message-wrapper">
                  <div id="login-message-content">
                    <h6>Login Gagal</h6>
                    <div id="error-login">{
                      error === 'Network Error' ?
                      <span>Koneksi dengan server kami terputus,<br />silahkan coba kembali.</span>
                      :
                      error
                    }</div>
                  </div>
                </div>
              </div>
            : 
            <div id="login-message">
              <div id="login-message-wrapper">
                <div id="login-message-content">
                  <h6>Login Berhasil</h6>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
) : '';

export default LoginPopupComponent;
