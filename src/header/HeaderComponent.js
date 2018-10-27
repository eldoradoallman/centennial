import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const HeaderComponent = ({
    logo,
    searchIcon,
    user,
    isSidebarOpen,
    toggleSidebarMenu,
    loggedIn,
    logout,
    openRegisterPopup,
    openLoginPopup,
    Functions,
    isUserSettingsOpen,
    toggleUserSettings,
    isSearchbarOpen,
    toggleSearchbar,
    onInputChange,
    submitSearch,
    searchQuery
  }) => (
  <div id="header">
    <div id="header-wrapper" className="clear">
      <div id="header-top">
        <Link to="/" id="logo">
          <img src={logo} width="150" alt="React Logo" />
        </Link>
      </div>
      {
        !loggedIn ?
          <div id="user-info">
            <button className="main-button" onClick={openLoginPopup}>Login</button>
            <button className="black-button main-button" onClick={openRegisterPopup}>Register</button>
          </div>
        :
          <div id="user-info">
            <div id="user-avatar" onClick={toggleUserSettings}>
              <img src={user.avatar ? user.avatar.small : ''} alt="" />
            </div>
            {
              isUserSettingsOpen ?
                <div id="user-settings-wrapper">
                  <Link to="/author/5/kevin-dharmawangsa" onClick={toggleUserSettings}>Profile</Link>
                  <Link to="/bookmarks" onClick={toggleUserSettings}>Bookmarks</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              :
                ''
            }
          </div>
      }
      <div id="header-bottom">
        <div id="toggle-sidebar-menu" className={isSidebarOpen ? 'open' : ''} onClick={toggleSidebarMenu}></div>
        <div id="desktop-menu-wrapper">
          <ul>
            <li className="desktop-menu">
              <NavLink to="/" exact activeClassName="selected">HOME</NavLink>
            </li>
            <li className="desktop-menu">
              <NavLink to="/category/entertainment" activeClassName="selected">ENTERTAINMENT</NavLink>
            </li>
            <li className="desktop-menu">
              <NavLink to="/category/livestyle" activeClassName="selected">LIVE STYLE</NavLink>
            </li>
            <li className="desktop-menu">
              <NavLink to="/category/techno" activeClassName="selected">TECHNO</NavLink>
            </li>
            <li className="desktop-menu">
              <NavLink to="/category/about-you" activeClassName="selected">ABOUT YOU</NavLink>
            </li>
            <li className="desktop-menu">
              <NavLink to="/category/ideas" activeClassName="selected">IDEAS</NavLink>
            </li>
          </ul>
        </div>
        <div id="search-wrapper" className={isSearchbarOpen ? 'searchbar active' : 'searchbar'}>
          <input
            id="search-input"
            type="text"
            placeholder="Cari artikel di sini..."
            value={searchQuery}
            onChange={onInputChange}
            onKeyPress={(evt) => {
              if (evt.key === 'Enter') {
                const searchResult = Functions.replaceWhiteSpaces(searchQuery);
                if (searchResult) {
                  toggleSearchbar();
                }
                submitSearch();
              }
            }}
          />
          <div
            id="submit-search"
            onClick={() => {
              toggleSearchbar();
              submitSearch();
            }}
          >
            <img src={searchIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderComponent;
