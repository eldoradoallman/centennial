import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../../api';

import { actions as latestNewsActions } from '../../home/latestnews/LatestNewsDucks';
import LatestNewsItemComponent from './LatestNewsItemComponent';
import LatestNewsTitleComponent from './LatestNewsTitleComponent';

class ConnectedLatestNews extends Component {
  state = {
    per: 10,
    page: 1,
    latest_news: []
  }

  loadLatestNews() {
    const { per, page, latest_news } = this.state;
    const url = api.home.latest_news;
    /* const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`; */

    axios.get(url)
      .then(json => this.setState({
        page: this.state.page + 1,
        latest_news: [ ...latest_news, ...json.data.latest_news ]
      }))
      .catch(error => console.log(error));
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
            <React.Fragment key={article.id}>
              <LatestNewsTitleComponent article={article} />
              <LatestNewsItemComponent article={article} />
            </React.Fragment>
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
