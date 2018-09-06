import React, { Component } from 'react';
import axios from 'axios';

import PopularNewsComponent from './PopularNewsComponent';

import './PopularNews.css';

class PopularNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      popular_news: []
    };
  }
  
  componentDidMount() {
    axios.get(this.state.url)
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
