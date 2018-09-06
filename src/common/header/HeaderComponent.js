import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const HeaderComponent = ({ logo, isSidebarOpen, toggleSidebarMenu }) => (
  <div id="header">
    <div id="header-wrapper" className="clear">
      <div id="header-top">
        <Link to="/" id="logo">
          <img src={logo} width="150" alt="React Logo" />
        </Link>
      </div>
      <div id="header-bottom">
        <div id="toggle-sidebar-menu" className={isSidebarOpen ? 'open' : ''} onClick={toggleSidebarMenu}></div>
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
);

export default HeaderComponent;