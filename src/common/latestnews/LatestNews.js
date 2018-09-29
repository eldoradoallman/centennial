import React, { Component } from 'react';

import generalServices from '../../_helpers/generalServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import LatestNewsComponent from './LatestNewsComponent';

class LatestNews extends Component {
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
  
  componentDidUpdate(prevProps) {
    if (this.props.urlLocation !== prevProps.urlLocation) {
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
      this.loadLatestNews();
    }
  }

  loadLatestNews() {
    this.setState({ fetching: true });
    generalServices.fetchContent(`${this.state.url}?per=${this.state.per}&page=${this.state.page}`)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        latest_news: [ ...this.state.latest_news, ...json.data.content.latest_news ],
        page: this.state.page + 1,
        has_more: json.data.content.has_more
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error
      }));
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.latest_news.length}
        next={this.loadLatestNews.bind(this)}
        hasMore={this.state.has_more}
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

export default LatestNews;
