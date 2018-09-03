import React, { Component } from 'react';
import axios from 'axios';
import api from '../../api';

import PopularNewsComponent from './PopularNewsComponent';

import './PopularNews.css';

class PopularNews extends Component {
  state = {
    popular_news: []
  };
  
  componentDidMount() {
    const url = api.home.popular_news;

    axios.get(url)
      .then(json => this.setState({
        popular_news: json.data
      }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <PopularNewsComponent {...this.state} />
    );
  }
}

export default PopularNews;
