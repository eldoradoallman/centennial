import React, { Component } from 'react';

import generalServices from '../../_helpers/generalServices';
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
    generalServices.fetchContent(this.state.url)
      .then(json => this.setState({
        popular_news: json.data.content
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
