import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import { actions as userAuthActions } from '../_user/userAuthDucks';
import { actions as bookmarksActions } from './BookmarksDucks';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToTopOnMount from '../common/scrolltotop/ScrollToTopOnMount';
import BookmarksComponent from './BookmarksComponent';

import './Bookmarks.css';

class ConnectedBookmarks extends Component {
  signal = axios.CancelToken.source();

  getBookmarksCollection() {
    const { getBookmarksList, user, per, page } = this.props;
    const apiUrl = `${API.BOOKMARKS}/${user.id}?per=${per}&page=${page}`;
    
    getBookmarksList(apiUrl, this.signal.token);
  }

  componentDidMount() {
    this.getBookmarksCollection();
  }

  componentWillUnmount() {
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    this.signal.cancel('Bookmarks Api is being canceled');
    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }

  render() {
    const { bookmarksList, has_more } = this.props;
    console.log(bookmarksList);

    return (
      <div id="search" className="page-content-mid-wrapper">
        <ScrollToTopOnMount />
        <div id="title-bookmarks-wrapper">
          <h1 className="bookmarks-title category-title center">Bookmarks</h1>
        </div>
        <div className="bookmarks-content-wrapper">
          <InfiniteScroll
            dataLength={bookmarksList.length}
            next={this.getBookmarksCollection.bind(this)}
            hasMore={has_more}
            loader={<p>Loading...</p>}
            endMessage={<p>All contents already shown.</p>}
            scrollThreshold="250px"
          >
            {
              bookmarksList.map((article, index) => (
                <BookmarksComponent {...this.props}
                  key={index}
                  article={article}
                  cancelToken={this.signal.token}
                />
              ))  
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

ConnectedBookmarks.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  user: PropTypes.any,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getArticlesPending: PropTypes.bool.isRequired,
  getArticlesRejected: PropTypes.bool.isRequired,
  getArticlesFulfilled: PropTypes.bool.isRequired,
  addArticlePending: PropTypes.bool.isRequired,
  addArticleRejected: PropTypes.bool.isRequired,
  addArticleFulfilled: PropTypes.bool.isRequired,
  removeArticlePending: PropTypes.bool.isRequired,
  removeArticleRejected: PropTypes.bool.isRequired,
  removeArticleFulfilled: PropTypes.bool.isRequired,
  getBookmarksList: PropTypes.func.isRequired,
  addArticle: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired,
  bookmarksList: PropTypes.array.isRequired,
  page: PropTypes.any.isRequired,
  has_more: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu,
  ...state.userAuth,
  ...state.bookmarks
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...sidebarMenuActions,
    ...userAuthActions,
    ...bookmarksActions
  }, dispatch)
});

const Bookmarks = connect(mapStateToProps, mapDispatchToProps)(ConnectedBookmarks);

export default Bookmarks;
