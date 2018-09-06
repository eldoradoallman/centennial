import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenuComponent = ({ isSidebarOpen }) => (
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
);

export default SidebarMenuComponent;
