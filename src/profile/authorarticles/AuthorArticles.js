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
    has_more: true,
    topic: ''
  };

  fetchingContent() {
    let topic = this.props.match.params.topicId;
    let apiUrl;
    
    topic === 'following' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/following?per=${this.state.per}&page=${this.state.page}` :
    topic === 'followers' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/followers?per=${this.state.per}&page=${this.state.page}` :
    topic === 'applause' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/applauses?per=${this.state.per}&page=${this.state.page}` :
      apiUrl = `${API.PROFILE}/${this.props.authorId}/articles?per=${this.state.per}&page=${this.state.page}`;

    this.setState({
      fetching: true,
      topic
    });
    generalServices.fetchContent(apiUrl)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        content: [ ...this.state.content, ...json.data.content.articles ],
        page: this.state.page + 1,
        has_more: json.data.content.has_more
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error
      }));
  }
  
  componentDidMount() {
    this.fetchingContent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({
        fetching: false,
        fetched: false,
        error: null,
        content: [],
        per: 10,
        page: 1,
        has_more: true,
        topic: ''
      });
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
            hasMore={this.state.has_more}
            loader={<p>Loading...</p>}
          >
            <AuthorArticlesComponent content={content} />
          </InfiniteScroll>
        }
      </div>
    );
  }
}
