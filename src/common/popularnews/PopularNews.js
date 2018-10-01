import React, { Component } from 'react';
import axios from 'axios';

import Services from '../../Services';
import PopularNewsComponent from './PopularNewsComponent';

import './PopularNews.css';

class PopularNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetched: false,
      error: null,
      url: props.url,
      popular_news: []
    };
  }
  
  signal = axios.CancelToken.source();
  
  loadPopularNews = async () => {
    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(this.state.url, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        popular_news: data.content
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
    this.loadPopularNews();
  }
  
  componentWillUnmount() {
    this.signal.cancel('Popular News Api is being canceled');
  }

  render() {
    return (
      <PopularNewsComponent {...this.state} />
    );
  }
}

export default PopularNews;
