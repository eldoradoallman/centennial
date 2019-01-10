import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Services from '../../Services';
import { actions as userAuthActions } from '../../_user/userAuthDucks';
import { actions as bookmarksActions } from '../../bookmarks/BookmarksDucks';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderComponent from '../loader/LoaderComponent';
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

  async loadLatestNews() {
    const { searchParams } = this.props;
    const { url, per, page, latest_news } = this.state;
    const apiUrl = `${url}${searchParams ? searchParams + '&' : '?'}per=${per}&page=${page}`;

    try {
      await this.setState({ fetching: true });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      await this.setState({
        fetching: false,
        fetched: true,
        latest_news: [ ...latest_news, ...data.content.latest_news ],
        page: page + 1,
        has_more: data.content.has_more
      });
      console.log(data.message);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        await this.setState({
          fetching: false,
          fetched: false,
          error
        });
      }
    }
  }

  updateBookmarkedArticle(articleID, boolean) {
    this.state.latest_news.map(async (article, index) => {
      if (article.id === articleID) {
        const latest_news = [ ...this.state.latest_news ];
        latest_news[index] = { ...latest_news[index], isBookmarked: boolean };
        await this.setState({ latest_news });
      }
    });
  }

  removeBookmarkedArticle(articleID) {
    this.updateBookmarkedArticle(articleID, false);
  }

  addBookmarkedArticle(articleID) {
    this.updateBookmarkedArticle(articleID, true);
  }

  componentDidMount() {
    const { fetching, latest_news } = this.state;

    if (!fetching && latest_news.length === 0) {
      this.loadLatestNews();
    }
  }

  componentWillUnmount() {
    this.signal.cancel('Latest News Api is being canceled');
  }

  async componentDidUpdate(prevProps) {
    const { searchParams, url } = this.props;

    if (searchParams !== prevProps.searchParams) {
      await this.setState({
        fetching: false,
        fetched: false,
        error: null,
        latest_news: [],
        url,
        per: 10,
        page: 1,
        has_more: true
      });
      this.loadLatestNews();
    }
  }

  render() {
    const { user, pageDomain } = this.props;
    const { latest_news, has_more } = this.state;
    console.log(latest_news);

    return (
      <InfiniteScroll
        dataLength={latest_news.length}
        next={this.loadLatestNews.bind(this)}
        hasMore={has_more}
        loader={<LoaderComponent />}
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
              pageDomain={pageDomain}
              cancelToken={this.signal.token}
              removeBookmarkedArticle={this.removeBookmarkedArticle.bind(this)}
              addBookmarkedArticle={this.addBookmarkedArticle.bind(this)}
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
