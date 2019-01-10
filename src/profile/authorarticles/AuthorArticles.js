import React, { Component } from 'react';
import axios from 'axios';

import API from '../../_api';
import Services from '../../Services';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderComponent from '../../common/loader/LoaderComponent';
import AuthorArticlesComponent from './AuthorArticlesComponent';

import './AuthorArticles.css';

class AuthorArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetched: false,
      error: null,
      content: [],
      per: 10,
      page: 1,
      has_more: true,
      topic: ''
    };
  }

  signal = axios.CancelToken.source();

  resolveApiUrl(topic, authorId, per, page) {
    return topic === 'following' ?
        `${API.PROFILE}/${authorId}/following?per=${per}&page=${page}` :
      topic === 'followers' ?
        `${API.PROFILE}/${authorId}/followers?per=${per}&page=${page}` :
      topic === 'applause' ?
        `${API.PROFILE}/${authorId}/applauses?per=${per}&page=${page}` :
        `${API.PROFILE}/${authorId}/articles?per=${per}&page=${page}`;
  }

  async loadLatestContents() {
    const { match, authorId } = this.props;
    const { per, page, content } = this.state;
    const topic = match.params.topicId;
    const apiUrl = this.resolveApiUrl(topic, authorId, per, page);

    try {
      await this.setState({ fetching: true, topic });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      await this.setState({
        fetching: false,
        fetched: true,
        content: [ ...content, ...data.content.articles ],
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

  resolveTitle(topic) {
    return topic ?
      topic === 'following' ? 'Mengikuti' :
      topic === 'followers' ? 'Pengikut' : 'Apresiasi'
      : 'Tulisan Terbaru';
  }

  componentDidMount() {
    this.loadLatestContents();
  }

  componentWillUnmount() {
    this.signal.cancel('Latest Articles Api is being canceled');
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      await this.setState({
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
    const { content, has_more, topic } = this.state;
    const titleTab = this.resolveTitle(topic);

    return (
      <div className="history-content-wrapper">
        <h4 className="title-history">{titleTab}</h4>
        <InfiniteScroll
          dataLength={content.length}
          next={this.loadLatestContents.bind(this)}
          hasMore={has_more}
          loader={<LoaderComponent />}
          endMessage={<p>All contents already shown.</p>}
          scrollThreshold="250px"
        >
          {
            content.map((article, index) => (
              <AuthorArticlesComponent key={index} article={article} />
            ))  
          }
        </InfiniteScroll>
      </div>
    );
  }
}

export default AuthorArticles;
