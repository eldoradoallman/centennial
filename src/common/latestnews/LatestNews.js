import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Services from '../../Services';
import { actions as userAuthActions } from '../../_user/userAuthDucks';
import { actions as bookmarksActions } from '../../bookmarks/BookmarksDucks';
import InfiniteScroll from 'react-infinite-scroll-component';
import LatestNewsComponent from './LatestNewsComponent';

class ConnectedLatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetched: false,
      error: null,
      latest_news: [],
      url: props.url,
      per: 10,
      page: 1,
      has_more: true
    };
  }

  signal = axios.CancelToken.source();

  loadLatestNews = async () => {
    const { searchParams } = this.props;
    const { url, per, page, latest_news } = this.state;
    const apiUrl = `${url}${searchParams ? searchParams + '&' : '?'}per=${per}&page=${page}`;

    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        latest_news: [ ...latest_news, ...data.content.latest_news ],
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
    const { fetching, latest_news } = this.state;

    setTimeout(() => !fetching && latest_news.length === 0 && this.loadLatestNews(), 100);
  }

  componentWillUnmount() {
    this.signal.cancel('Latest News Api is being canceled');
  }
  
  componentDidUpdate(prevProps) {
    const { urlLocation, searchParams, url } = this.props;

    if (
      urlLocation !== prevProps.urlLocation ||
      searchParams !== prevProps.searchParams
    ) {
      this.setState({
        fetching: false,
        fetched: false,
        error: null,
        latest_news: [],
        url,
        per: 10,
        page: 1,
        has_more: true
      });
      setTimeout(() => !this.state.fetching && this.state.latest_news.length === 0 && this.loadLatestNews(), 100);
    }
  }

  render() {
    const { user, page } = this.props;
    const { latest_news, has_more } = this.state;
    console.log(latest_news);

    return (
      <InfiniteScroll
        dataLength={latest_news.length}
        next={this.loadLatestNews.bind(this)}
        hasMore={has_more}
        loader={<p>Loading...</p>}
        endMessage={<p>All contents already shown.</p>}
        scrollThreshold="250px"
      >
        {
          latest_news.map((article, index) => (
            <LatestNewsComponent {...this.props}
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
    );
  }
}

ConnectedLatestNews.propTypes = {
  registering: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  user: PropTypes.any,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addArticlePending: PropTypes.bool.isRequired,
  addArticleRejected: PropTypes.bool.isRequired,
  addArticleFulfilled: PropTypes.bool.isRequired,
  removeArticlePending: PropTypes.bool.isRequired,
  removeArticleRejected: PropTypes.bool.isRequired,
  removeArticleFulfilled: PropTypes.bool.isRequired,
  addArticle: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.userAuth,
  ...state.bookmarks
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...userAuthActions,
    ...bookmarksActions
  }, dispatch)
});

const LatestNews = connect(mapStateToProps, mapDispatchToProps)(ConnectedLatestNews);

export default LatestNews;
