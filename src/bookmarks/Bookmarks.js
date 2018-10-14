import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import BookmarksComponent from './BookmarksComponent';

import './Bookmarks.css';

class ConnectedBookmarks extends Component {
  state = {
    inputClassName: 'search-title',
    searchQuery: ''
  };
  
  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.url === prevProps.match.url &&
      this.props.location.search !== prevProps.location.search
    ) {
      this.setState({
        inputClassName: 'search-title',
        searchQuery: ''
      });
    }
  }

  inputOnMouseOver() {
    this.setState({ inputClassName: 'search-title active' });
  }

  inputOnMouseLeave() {
    this.setState({ inputClassName: 'search-title' });
  }

  submitSearch() {
  }

  render() {
    return (
      <BookmarksComponent {...this.state}
        inputOnMouseOver={this.inputOnMouseOver.bind(this)}
        inputOnMouseLeave={this.inputOnMouseLeave.bind(this)}
      />
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
