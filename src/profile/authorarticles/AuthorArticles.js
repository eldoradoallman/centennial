import React, { Component } from 'react';
import axios from 'axios';

import API from '../../_api';
import Services from '../../Services';
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
  
  signal = axios.CancelToken.source();
  
  loadLatestContents = async () => {
    let topic = this.props.match.params.topicId;
    let apiUrl;
    
    topic === 'following' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/following?per=${this.state.per}&page=${this.state.page}` :
    topic === 'followers' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/followers?per=${this.state.per}&page=${this.state.page}` :
    topic === 'applause' ?
      apiUrl = `${API.PROFILE}/${this.props.authorId}/applauses?per=${this.state.per}&page=${this.state.page}` :
      apiUrl = `${API.PROFILE}/${this.props.authorId}/articles?per=${this.state.per}&page=${this.state.page}`;

    try {
      this.setState({
        fetching: true,
        topic
      });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        content: [ ...this.state.content, ...data.content.articles ],
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
    this.loadLatestContents();
  }

  componentWillUnmount() {
    this.signal.cancel('Latest Articles Api is being canceled');
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
      this.loadLatestContents();
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
            next={this.loadLatestContents.bind(this)}
            hasMore={this.state.has_more}
            loader={<p>Loading...</p>}
            endMessage={<p>All contents already shown.</p>}
            scrollThreshold="250px"
          >
            <AuthorArticlesComponent content={content} />
          </InfiniteScroll>
        }
      </div>
    );
  }
}
