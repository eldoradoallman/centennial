import React, { Component } from 'react';
import axios from 'axios';

import { logger } from '../../Functions';
import Services from '../../Services';
import LoaderComponent from '../loader/LoaderComponent';
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
      logger(() => console.log(data.message));
      this.setState({
        fetching: false,
        fetched: true,
        popular_news: data.content
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        logger(() => console.log('Error: ', error.message));
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
    const { fetching } = this.state;

    return (
      <React.Fragment>
        <div className="category-news-wrapper clear">
          <h4 className="category-news">Artikel Populer</h4>
          <div className="border"></div>
        </div>
        {
          fetching ?
            <LoaderComponent />
          :
            <PopularNewsComponent {...this.state} />
        }
      </React.Fragment>
    );
  }
}

export default PopularNews;
