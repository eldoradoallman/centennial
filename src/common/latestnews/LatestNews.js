import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import generalServices from '../../_helpers/generalServices';
import { actions as latestNewsActions } from './LatestNewsDucks';
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
      page: 1
    };
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.urlLocation !== prevProps.urlLocation) {
      this.setState({
        fetching: false,
        fetched: false,
        error: null,
        latest_news: [],
        url: this.props.url,
        per: 10,
        page: 1
      });
      this.loadLatestNews();
    }
  }

  loadLatestNews() {
    /* const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`; */
    this.setState({ fetching: true });
    generalServices.fetchContent(this.state.url)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        latest_news: [ ...this.state.latest_news, ...json.data.content.latest_news ],
        page: this.state.page + 1
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error: error
      }));
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.latest_news.length}
        next={this.loadLatestNews.bind(this)}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {
          this.state.latest_news.map((article, index) => (
            <LatestNewsComponent key={index} article={article} index={index} page={this.props.page} />
          ))  
        }
      </InfiniteScroll>
    );
  }
}

ConnectedLatestNews.propTypes = {
  latestNewsFetching: PropTypes.bool.isRequired,
  latestNewsFetched: PropTypes.bool.isRequired,
  latestNewsError: PropTypes.object,
  latestNews: PropTypes.array.isRequired,
  fetchLatestNewsContent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.latestNews,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...latestNewsActions
  }, dispatch)
});

const LatestNews = connect(mapStateToProps, mapDispatchToProps)(ConnectedLatestNews);

export default LatestNews;
