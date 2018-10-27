import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import BookmarksComponent from './BookmarksComponent';

import './Bookmarks.css';

class ConnectedBookmarks extends Component {
  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  render() {
    return (
      <BookmarksComponent {...this.props} />
    );
  }
}

ConnectedBookmarks.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sidebarMenuActions, dispatch)
});

const Bookmarks = connect(mapStateToProps, mapDispatchToProps)(ConnectedBookmarks);

export default Bookmarks;
