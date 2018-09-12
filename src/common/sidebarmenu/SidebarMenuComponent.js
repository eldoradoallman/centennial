import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenuComponent = ({ isSidebarOpen }) => (
  <div id="sidebar-menu-wrapper" className={isSidebarOpen ? 'open' : ''}>
    <ul>
      <li className="sidebar-menu">
        <NavLink to="/" exact activeClassName="selected">HOME</NavLink>
      </li>
      <li className="sidebar-menu">
        <NavLink to="/category/entertainment" exact activeClassName="selected">ENTERTAINMENT</NavLink>
      </li>
      <li className="sidebar-menu">
        <NavLink to="/category/livestyle" activeClassName="selected">LIVE STYLE</NavLink>
      </li>
      <li className="sidebar-menu">
        <NavLink to="/category/techno" exact activeClassName="selected">TECHNO</NavLink>
      </li>
      <li className="sidebar-menu">
        <NavLink to="/category/about-you" exact activeClassName="selected">ABOUT YOU</NavLink>
      </li>
      <li className="sidebar-menu">
        <NavLink to="/category/ideas" exact activeClassName="selected">IDEAS</NavLink>
      </li>
    </ul>
  </div>
);

export default SidebarMenuComponent;
