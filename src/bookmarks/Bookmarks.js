import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToTopOnMount from '../common/scrolltotop/ScrollToTopOnMount';
import BookmarksComponent from './BookmarksComponent';

import './Bookmarks.css';

class ConnectedBookmarks extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    bookmarks: [],
    per: 10,
    page: 1,
    has_more: true
  };

  signal = axios.CancelToken.source();

  loadBookmarks = async () => {
    const { user } = this.props;
    const { per, page, bookmarks } = this.state;
    const apiUrl = `${API.BOOKMARKS}/${user.id}?per=${per}&page=${page}`;

    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        bookmarks: [ ...bookmarks, ...data.content.latest_news ],
        page: page + 1,
        has_more: data.content.has_more
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        this.setState({
          fetching: false,
          fetched: false,
          error
        });
      }
    }
  };

  componentDidMount() {
    this.loadBookmarks();
  }

  componentWillUnmount() {
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    this.signal.cancel('Bookmarks Api is being canceled');
    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }

  render() {
    const { user } = this.props;
    const { bookmarks, has_more, page } = this.state;

    return (
      <div id="search" className="page-content-wrapper">
        <ScrollToTopOnMount />
        <div id="title-bookmarks-wrapper">
          <h1 className="bookmarks-title">Bookmarks</h1>
        </div>
        <div className="bookmarks-content-wrapper">
          <InfiniteScroll
            dataLength={bookmarks.length}
            next={this.loadBookmarks.bind(this)}
            hasMore={has_more}
            loader={<p>Loading...</p>}
            endMessage={<p>All contents already shown.</p>}
            scrollThreshold="250px"
          >
            {
              bookmarks.map((article, index) => (
                <BookmarksComponent {...this.props}
                  key={index}
                  user={user}
                  article={article}
                  index={index}
                  page={page}
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
