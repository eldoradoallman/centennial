import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import { actions as userAuthActions } from '../../_user/userAuthDucks';
import { actions as headerActions } from './HeaderDucks';
import HeaderComponent from './HeaderComponent';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SidebarMenuComponent from '../sidebarmenu/SidebarMenuComponent';
import { actions as loginPopupActions } from '../../loginpopup/LoginPopupDucks';

import './Header.css';
import '../sidebarmenu/SidebarMenu.css';
import logo from '../../assets/img/logo.jpg';

class ConnectedHeader extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchHeaderContent();
    }
  }

  toggleSidebarMenu() {
    this.props.toggleSidebarMenu();
  }
  
  render() {
    const { isSidebarOpen, loggedIn, login, register, logout, openLoginPopup } = this.props;

    return (
      <React.Fragment>
        <Headroom>
          <HeaderComponent
            logo={logo}
            isSidebarOpen={isSidebarOpen}
            toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
            loggedIn={loggedIn}
            login={login}
            register={register}
            logout={logout}
            openLoginPopup={openLoginPopup}
          />
          <SidebarMenuComponent isSidebarOpen={isSidebarOpen} />
        </Headroom>
      </React.Fragment>
    );
  }
}

ConnectedHeader.propTypes = {
  headerFetching: PropTypes.bool.isRequired,
  headerFetched: PropTypes.bool.isRequired,
  headerError: PropTypes.object,
  users: PropTypes.array.isRequired,
  fetchHeaderContent: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  user: PropTypes.any,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired,
  isLoginPopupOpen: PropTypes.bool.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  closeLoginPopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.header,
  ...state.userAuth,
  ...state.sidebarMenu,
  ...state.loginPopup
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...headerActions,
    ...userAuthActions,
    ...sidebarMenuActions,
    ...loginPopupActions
  }, dispatch)
});

const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader));

export default Header;
