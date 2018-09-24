import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPopupComponent = ({
    loggedIn,
    error,
    register,
    login,
    logout,
    isLoginPopupOpen,
    onLogin,
    onRegister,
    closeLoginPopup,
    goToRegister,
    goToLogin,
    onChange,
    resetForm
  }) => isLoginPopupOpen ? (
    <div id="login-popup">
      <div id="login-popup-wrapper">
        <div id="login-popup-box">
          <a onClick={() => {
            closeLoginPopup();
            resetForm();
            if (error) {
              logout();
            }
          }} id="close-login-popup"></a>
          {
            !loggedIn && !error ?
              <div id="login-message">
                <div id="login-message-wrapper">
                  <div id="login-message-content">
                    {
                      onLogin ?
                        <h6>Selamat Datang Kembali!</h6>
                      :
                        <h6>Buat Akunmu</h6>
                    }
                    <div id="login-summary">
                      {
                        onLogin ?
                          <p>Silahkan login untuk mengakses halaman personal pilihanmu serta melihat artikel terbaru dari para penulis favoritmu.</p>
                        :
                          <p>Silahkan daftar untuk mendapatkan akses personal halaman berandamu dan mengikuti beragam artikel terbaru dari para penulis terfavorit.</p>
                      }
                    </div>
                    <div id="login-form">
                      <div className="login-input">
                        {
                          onLogin ?
                            <div>
                              <input id="login-username-email" type="text" placeholder="Masukkan username/email kamu" onChange={onChange} />
                            </div>
                          :
                            <input id="register-email" type="text" placeholder="Masukkan email kamu" onChange={onChange} />
                        }
                      </div>
                      <div className="login-input">
                        {
                          onLogin ?
                            <div>
                              <input id="login-password" type="password" placeholder="Masukkan password kamu" onChange={onChange} />
                            </div>
                          :
                            <input id="register-password" type="password" placeholder="Masukkan password kamu" onChange={onChange} />
                        }
                      </div>
                      {
                        onRegister ?
                        <div className="login-input">
                          <input id="register-password-confirm" type="password" placeholder="Konfirmasi password kamu" onChange={onChange} />
                        </div> : ''
                      }
                    </div>
                    {
                      onLogin ?
                        <React.Fragment>
                          <button
                            id="login-button"
                            className="black-button main-button"
                            onClick={
                              () => login({ username: 'duaneallman', email: 'duane@gmail.com', password: 'duane1986' }, closeLoginPopup, resetForm)
                            }
                          >LOGIN</button>
                          <p id="to-register-popup">Belum punya akun? <a onClick={() => { goToRegister(); resetForm(); }}>Buat sekarang</a>.</p>
                        </React.Fragment>
                      :
                        <React.Fragment>
                          <button
                            id="login-button"
                            className="black-button main-button"
                            onClick={
                              () => register({ username: 'duaneallman', email: 'duane@gmail.com', password: 'duane1986' }, closeLoginPopup, resetForm)
                            }
                          >REGISTER</button>
                          <p id="to-register-popup">Sudah punya akun? <a onClick={() => { goToLogin(); resetForm(); }}>Login sekarang</a>.</p>
                        </React.Fragment>
                    }
                  </div>
                </div>
              </div>
            :
            error ?
              <div id="login-message">
                <div id="login-message-wrapper">
                  <div id="login-message-content">
                    <h6>Login Gagal</h6>
                    <div id="login-summary">{
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
