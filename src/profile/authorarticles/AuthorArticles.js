import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../api';

import InfiniteScroll from 'react-infinite-scroll-component';

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
    apiUrl = api.profile.following :
    topic === 'followers' ?
    apiUrl = api.profile.followers :
    topic === 'applause' ?
    apiUrl = api.profile.applause :
    apiUrl = api.profile.articles;

    this.setState({
      fetching: true,
      topic
    });
    axios.get(apiUrl)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        content: [ ...this.state.content, ...json.data.articles ],
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
    console.log(this.state);

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
            {
              content.map((article, index) => (
                <div key={article.id} className="col-50 collection-articles">
                  <div className="collection-articles-box">
                    <div className="writer-info-top clear">
                      <Link to={article.writer.url} className="writer-image">
                        <img src={article.writer.avatar.small} alt={article.writer.name} />
                      </Link>
                      <div className="article-writer-info">
                        <p className="writer">
                          Ditulis oleh <Link to={article.writer.url}>{article.writer.name}</Link>
                        </p>
                        <p className="date">{article.date}</p>
                      </div>
                    </div>
                    <Link to={article.url} className="article-image" title={article.title}>
                      <img src={article.image.size.medium} alt={article.image.caption} />
                    </Link>
                    <div className="article-summary-wrapper">
                      <Link to={article.url} className="title-article" title={article.title}>{article.title}</Link>
                      <p className="article-summary-content">{article.summary.substring(0,150) + '...'}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </InfiniteScroll>
        }
      </div>
    );
  }
}
