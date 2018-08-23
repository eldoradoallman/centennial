import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';
import { actions as headerActions } from './HeaderDucks';

import './Header.css';
import logo from '../logo.svg';

class ConnectedHeader extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchHeaderContent();
    }
  }
  
  render() {
    const { users, getUserData } = this.props;
    console.log(this.props);

    return (
      <div id="header">
        <div id="header-wrapper" className="clear">
          <div id="header-top">
            <Link to="/" id="logo">
              <img src={logo} width="150" alt="React Logo" />
            </Link>
          </div>
          <div id="header-bottom">
            <div id="desktop-menu-wrapper">
              <ul>
                <li className="desktop-menu">
                  <NavLink to="/" exact activeClassName="selected">HOME</NavLink>
                </li>
                <li className="desktop-menu">
                  <NavLink to="/about" exact activeClassName="selected">ENTERTAINMENT</NavLink>
                </li>
                <li className="desktop-menu">
                  <NavLink to="/topics" exact activeClassName="selected">LIVE STYLE</NavLink>
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
    );
  }
}

ConnectedHeader.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  error: PropTypes.object,
  users: PropTypes.array.isRequired,
  fetchHeaderContent: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.header
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(headerActions, dispatch)
});

const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader));

export default Header;
