import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import { replaceWhiteSpaces } from '../Functions';
import { actions as userAuthActions } from '../_user/userAuthDucks';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SidebarMenuComponent from '../sidebarmenu/SidebarMenuComponent';
import { actions as loginPopupActions } from '../loginpopup/LoginPopupDucks';
import HeaderComponent from './HeaderComponent';

import './Header.css';
import '../sidebarmenu/SidebarMenu.css';
import logo from '../assets/img/logo.jpg';
import searchIcon from '../assets/img/search-icon.svg';

class ConnectedHeader extends Component {
  state = {
    isUserSettingsOpen: false,
    isUserSettingsOnHover: false,
    isSearchbarOpen: false,
    searchQuery: '',
    isWindowBelow1000Px: false
  };

  toggleSidebarMenu() {
    this.props.toggleSidebarMenu();
  }

  resolveWindowWidth() {
    if (window.innerWidth < 1001) {
      this.setState({ isWindowBelow1000Px: true });
    } else {
      this.setState({ isWindowBelow1000Px: false });
    }
  }

  toggleUserSettings() {
    this.setState({ isUserSettingsOpen: !this.state.isUserSettingsOpen });
  }

  closeUserSettings() {
    setTimeout(() => {
      const { isUserSettingsOpen, isUserSettingsOnHover } = this.state;
      if (isUserSettingsOpen && !isUserSettingsOnHover) {
        this.setState({ isUserSettingsOpen: false });
      }
    }, 500);
  }

  userSettingsOnHover() {
    this.setState({ isUserSettingsOnHover: true });
  }

  userSettingsNotOnHover() {
    setTimeout(() => {
      this.setState({
        isUserSettingsOnHover: false,
        isUserSettingsOpen: false
      });
    }, 500);
  }

  toggleSearchbar() {
    this.setState({ isSearchbarOpen: !this.state.isSearchbarOpen });
  }

  onInputChange(evt) {
    this.setState({ searchQuery: evt.target.value });
  }

  submitSearch() {
    const searchResult = replaceWhiteSpaces(this.state.searchQuery);
    if (searchResult) {
      this.props.history.push({
        pathname: '/search',
        search: `?q=${searchResult}`,
        state: { searchQuery: this.state.searchQuery }
      });
      this.setState({ searchQuery: '' });
    }
  }

  componentDidMount() {
    this.resolveWindowWidth();
  }
  
  render() {
    const { user, isSidebarOpen, loggedIn, login, register, logout, openRegisterPopup, openLoginPopup } = this.props;
    const { isUserSettingsOpen, isSearchbarOpen, searchQuery, isWindowBelow1000Px } = this.state;

    return (
      <React.Fragment>
        <Headroom>
          <HeaderComponent
            logo={logo}
            searchIcon={searchIcon}
            user={user}
            isSidebarOpen={isSidebarOpen}
            toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
            loggedIn={loggedIn}
            login={login}
            register={register}
            logout={logout}
            openRegisterPopup={openRegisterPopup}
            openLoginPopup={openLoginPopup}
            replaceWhiteSpaces={replaceWhiteSpaces}
            isUserSettingsOpen={isUserSettingsOpen}
            toggleUserSettings={this.toggleUserSettings.bind(this)}
            closeUserSettings={this.closeUserSettings.bind(this)}
            userSettingsOnHover={this.userSettingsOnHover.bind(this)}
            userSettingsNotOnHover={this.userSettingsNotOnHover.bind(this)}
            isSearchbarOpen={isSearchbarOpen}
            toggleSearchbar={this.toggleSearchbar.bind(this)}
            onInputChange={this.onInputChange.bind(this)}
            submitSearch={this.submitSearch.bind(this)}
            searchQuery={searchQuery}
            isWindowBelow1000Px={isWindowBelow1000Px}
          />
          <SidebarMenuComponent isSidebarOpen={isSidebarOpen} />
        </Headroom>
      </React.Fragment>
    );
  }
}

ConnectedHeader.propTypes = {
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
  openRegisterPopup: PropTypes.func.isRequired,
  openLoginPopup: PropTypes.func.isRequired,
  closeLoginPopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.userAuth,
  ...state.sidebarMenu,
  ...state.loginPopup
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...userAuthActions,
    ...sidebarMenuActions,
    ...loginPopupActions
  }, dispatch)
});

const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader));

export default Header;
