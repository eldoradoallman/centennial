import React, { Component } from 'react';

import API from '../../_api';
import generalServices from '../../_helpers/generalServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthorArticlesComponent from './AuthorArticlesComponent';

import './AuthorArticles.css';

export default class AuthorArticles extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    content: [],
    per: 10,
    page: 1,
    topic: ''
  };

  fetchingContent() {
    let topic = this.props.match.params.topicId;
    let apiUrl;
    
    topic === 'following' ?
      apiUrl = API.PROFILE.FOLLOWING :
    topic === 'followers' ?
      apiUrl = API.PROFILE.FOLLOWERS :
    topic === 'applause' ?
      apiUrl = API.PROFILE.APPLAUSES :
      apiUrl = API.PROFILE.ARTICLES;

    this.setState({
      fetching: true,
      topic
    });
    generalServices.fetchContent(apiUrl)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        content: [ ...this.state.content, ...json.data.content.articles ],
        page: this.state.page + 1
      }))
      .catch(error => this.setState({
        fetching: false,
        error
      }));
  }
  
  componentDidMount() {
    this.fetchingContent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({ content: [] });
      this.fetchingContent();
    }
  }

  render() {
    const { fetching, fetched, error, content, topic } = this.state;

    return (
      <div className="history-content-wrapper">
        {
          topic ?
          <h4 className="title-history">{
            topic === 'following' ? 'Mengikuti' :
            topic === 'followers' ? 'Pengikut' : 'Apresiasi'
          }</h4>
          :
          <h4 className="title-history">Tulisan Terbaru</h4>
        }
        {
          fetched &&
          <InfiniteScroll
            dataLength={content.length}
            next={this.fetchingContent.bind(this)}
            hasMore={true}
            loader={<p>Loading...</p>}
          >
            <AuthorArticlesComponent content={content} />
          </InfiniteScroll>
        }
      </div>
    );
  }
}
