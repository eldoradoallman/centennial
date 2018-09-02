import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

import { actions as latestNewsActions } from './LatestNewsDucks';
import LatestNewsComponent from './LatestNewsComponent';

import './LatestNews.css';

class ConnectedLatestNews extends Component {
  state = {
    per: 10,
    page: 1,
    latest_news: []
  }

  loadNews() {
    const { per, page, latest_news } = this.state;
    const url = `https://api.jsonbin.io/b/5b8b8c6bdb948c68635b4245/6`;
    /* const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`; */

    fetch(url)
      .then(response => response.json())
      .then(json => console.log(json) || this.setState({
        page: this.state.page + 1,
        latest_news: [ ...latest_news, ...json.latest_news ]
      }));
  }

  render() {

    return (
      <InfiniteScroll
        dataLength={this.state.latest_news.length}
        next={this.loadNews.bind(this)}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {
          this.state.latest_news.map((article, index) => {
            if (!article.id) {
              return article.editorial_picks.map((article_pick, index) => (
                <React.Fragment key={article_pick.id}>
                  <div className={
                    index === 0 || index === 1 ? 'col-50 main-col-featured-news' : 'col-100 secondary-col-featured-news'
                  }>
                    <div className="featured-news-box">
                      <Link to={article_pick.url} className="featured-news-image" title={article_pick.title}>
                        <img src={article_pick.image.size.medium} alt={article_pick.image.caption} />
                      </Link>
                      <div className={
                        index === 0 || index === 1 ? 'main-summary latest-news-summary' : 'latest-news-summary full'
                      }>
                        <Link to={article_pick.url} className="title-featured-news alt-title" title={article_pick.title}><span>{article_pick.title}</span></Link>
                        <div className="latest-info-writer-box">
                          <p className="writer">Ditulis oleh <Link to={article_pick.url}>{article_pick.writer.name}</Link></p>
                          <p>{article_pick.date}</p>
                        </div>
                        {
                          article_pick.topics.map((topic, index) => (
                            <Link to={'/' + topic} key={index} className={
                              topic === 'Pop Culture' ? 'pop-culture-topic topic' : 
                              topic === 'Beauty & Fashion' ? 'beauty-topic topic' : 
                              topic === 'Entertainment' ? 'entertainment topic' : 
                              topic === 'Techno' ? 'techno topic' : 
                              topic === 'Games' ? 'games topic' : 
                              topic === 'Movies' ? 'movies topic' : 'topic'
                            }>{topic}</Link>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ));
            } else {
              return (
                <React.Fragment key={article.id}>
                  {
                    index % 8 === 0 &&
                    <div className="category-news-wrapper clear">
                      <h4 className="category-news">{article.topic}</h4>
                      <div className="view-all-category view-all-wrapper">
                        <Link to={article.url_topic} className="view-all">
                          <span className="arrow-left"></span>
                          <span className="arrow-left"></span>
                          <span className="arrow-left"></span>
                          <span className="view-all-link">LIHAT SELURUHNYA</span>
                        </Link>
                      </div>
                      <div className="border"></div>
                    </div>
                  }
                  <div className="col-100 col-featured-news">
                    <div className="latest-news-box">
                      <Link to={article.url} className="latest-news-image" title={article.title}>
                        <img src={article.image.size.medium} alt={article.image.caption} />
                      </Link>
                      <div className="latest-news-summary">
                        <Link to={article.url} className="title-latest-news" title={article.title}>{article.title}</Link>
                        <p className="article-summary">{article.summary.substring(0,150) + '...'}</p>
                        <div className="latest-info-writer-box common">
                          <p className="writer">Ditulis oleh <Link to={article.url}>{article.writer.name}</Link></p>
                          <p>{article.date}</p>
                        </div>
                        <div className="bookmark-button">Simpan Artikel</div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          })  
        }
      </InfiniteScroll>
      // <LatestNewsComponent {...this.props} />
    );
  }
}

ConnectedLatestNews.propTypes = {
  latestNewsFetching: PropTypes.bool.isRequired,
  latestNewsFetched: PropTypes.bool.isRequired,
  latestNewsError: PropTypes.object,
  latestNews: PropTypes.array.isRequired,
  fetchLatestNewsContent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.latestNews,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...latestNewsActions
  }, dispatch)
});

const LatestNews = connect(mapStateToProps, mapDispatchToProps)(ConnectedLatestNews);

export default LatestNews;
