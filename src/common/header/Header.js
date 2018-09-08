import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import { actions as headerActions } from './HeaderDucks';
import HeaderComponent from './HeaderComponent';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SidebarMenuComponent from '../sidebarmenu/SidebarMenuComponent';

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
    const { isSidebarOpen, fetching, fetched, error } = this.props;
    console.log(this.props);

    return (
      <React.Fragment>
        <Headroom>
          <HeaderComponent 
            logo={logo} 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebarMenu={this.toggleSidebarMenu.bind(this)} 
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
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.header,
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...headerActions,
    ...sidebarMenuActions
  }, dispatch)
});

const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader));

export default Header;
