import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Services from '../../Services';
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
    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(`
        ${this.state.url}${this.props.searchParams ? this.props.searchParams + '&' : '?'}per=${this.state.per}&page=${this.state.page}`, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        latest_news: [ ...this.state.latest_news, ...data.content.latest_news ],
        page: this.state.page + 1,
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
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.fetching && this.state.latest_news.length === 0) {
        this.loadLatestNews();
      }
    }, 100);
  }

  componentWillUnmount() {
    this.signal.cancel('Latest News Api is being canceled');
  }
  
  componentDidUpdate(prevProps) {
    if (
      this.props.urlLocation !== prevProps.urlLocation ||
      this.props.searchParams !== prevProps.searchParams
    ) {
      this.setState({
        fetching: false,
        fetched: false,
        error: null,
        latest_news: [],
        url: this.props.url,
        per: 10,
        page: 1,
        has_more: true
      });
      setTimeout(() => {
        if (!this.state.fetching && this.state.latest_news.length === 0) {
          this.loadLatestNews();
        }
      }, 100);
    }
  }

  render() {
    console.log(this.state.latest_news);
    return (
      <InfiniteScroll
        dataLength={this.state.latest_news.length}
        next={this.loadLatestNews.bind(this)}
        hasMore={this.state.has_more}
        loader={<p>Loading...</p>}
        endMessage={<p>All contents already shown.</p>}
        scrollThreshold="250px"
      >
        {
          this.state.latest_news.map((article, index) => (
            <LatestNewsComponent {...this.props} key={index} article={article} index={index} page={this.props.page} cancelToken={this.signal.token} />
          ))  
        }
      </InfiniteScroll>
    );
  }
}

ConnectedLatestNews.propTypes = {
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
  ...state.bookmarks
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(bookmarksActions, dispatch)
});

const LatestNews = connect(mapStateToProps, mapDispatchToProps)(ConnectedLatestNews);

export default LatestNews;
