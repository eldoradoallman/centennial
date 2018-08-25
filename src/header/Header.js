import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';
import { actions as headerActions } from './HeaderDucks';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';

import './Header.css';
import logo from '../assets/img/logo.jpg';

class ConnectedHeader extends Component {
  constructor(props) {
    super(props);
  }

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
        <div id="header">
          <div id="header-wrapper" className="clear">
            <div id="header-top">
              <Link to="/" id="logo">
                <img src={logo} width="150" alt="React Logo" />
              </Link>
            </div>
            <div id="header-bottom">
              <div id="toggle-sidebar-menu" className={isSidebarOpen ? 'open' : ''} onClick={this.toggleSidebarMenu.bind(this)}></div>
              <div id="desktop-menu-wrapper">
                <ul>
                  <li className="desktop-menu">
                    <NavLink to="/" exact activeClassName="selected">HOME</NavLink>
                  </li>
                  <li className="desktop-menu">
                    <NavLink to="/about" exact activeClassName="selected">ENTERTAINMENT</NavLink>
                  </li>
                  <li className="desktop-menu">
                    <NavLink to="/topics" activeClassName="selected">LIVE STYLE</NavLink>
                  </li>
                  <li className="desktop-menu">
                    <NavLink to="/techno" exact activeClassName="selected">TECHNO</NavLink>
                  </li>
                  <li className="desktop-menu">
                    <NavLink to="/about-you" exact activeClassName="selected">ABOUT YOU</NavLink>
                  </li>
                  <li className="desktop-menu">
                    <NavLink to="/ideas" exact activeClassName="selected">IDEAS</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="sidebar-menu-wrapper" className={isSidebarOpen ? 'open' : ''}>
          <ul>
            <li className="sidebar-menu">
              <NavLink to="/" exact activeClassName="selected">HOME</NavLink>
            </li>
            <li className="sidebar-menu">
              <NavLink to="/about" exact activeClassName="selected">ENTERTAINMENT</NavLink>
            </li>
            <li className="sidebar-menu">
              <NavLink to="/topics" activeClassName="selected">LIVE STYLE</NavLink>
            </li>
            <li className="sidebar-menu">
              <NavLink to="/techno" exact activeClassName="selected">TECHNO</NavLink>
            </li>
            <li className="sidebar-menu">
              <NavLink to="/about-you" exact activeClassName="selected">ABOUT YOU</NavLink>
            </li>
            <li className="sidebar-menu">
              <NavLink to="/ideas" exact activeClassName="selected">IDEAS</NavLink>
            </li>
          </ul>
        </div>
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
