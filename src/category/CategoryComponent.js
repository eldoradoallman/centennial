import React from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-sticky-el';

import api from '../api';
import LatestNews from '../common/latestnews/LatestNews';
import PopularNews from '../common/popularnews/PopularNews';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

const CategoryComponent = ({
  fetching,
  fetched,
  error,
  editorial_picks
}) => (
  <div id="home-content" className="page-content-wrapper">
    <ScrollToTopOnMount />
    <div className="page-content">
      <div id="featured-news-wrapper">
        {
          fetched &&
          editorial_picks.map((article, index) => (
            <React.Fragment key={article.id}>
              <div className={
                index === 0 ? 'col-50 main-col-featured-news' : 
                index === 1 || index === 2 ? 'col-50 secondary-col-featured-news' :
                index > 2 ? 'col-25 col-featured-news' : 'col-featured-news'
              }>
                <div className="featured-news-box">
                  <Link to={article.url} className="featured-news-image" title={article.title}>
                    <img src={article.image.size.medium} alt={article.image.caption} />
                  </Link>
                  <div className={
                    index === 0 ? 'main-summary featured-news-summary' :
                    index === 1 || index === 2 ? 'secondary-summary featured-news-summary' : 'featured-news-summary'
                  }>
                    <Link to={article.url} className="title-featured-news"><span>{article.title}</span></Link>
                    <div className="info-writer-box">
                      <p className="writer">Ditulis oleh <Link to={article.url}>{article.writer.name}</Link></p>
                      <p>{article.date}</p>
                    </div>
                    {
                      article.topics.map((topic, index) => (
                        <Link to={'/' + topic} key={index} className={
                          topic === 'Pop Culture' ? 'pop-culture-topic topic' : 
                          topic === 'Beauty & Fashion' ? 'beauty-topic topic' : 
                          topic === 'Entertainment' ? 'entertainment topic' : 
                          topic === 'Techno' ? 'techno topic' : 
                          topic === 'Games' ? 'games topic' : 'topic'
                        }>{topic}</Link>
                      ))
                    }
                  </div>
                </div>
              </div>
              {
                index === 2 || index === 6 ? <br /> : ''
              }
            </React.Fragment>
          ))
        }
        {
          fetched &&
          <React.Fragment>
            <div id="home-va-wrapper" className="view-all-wrapper">
              <Link to="/featured-news" className="view-all">
                <span className="arrow-left"></span>
                <span className="arrow-left"></span>
                <span className="arrow-left"></span>
                <span className="view-all-link">LIHAT SEMUA BERITA UTAMA</span>
                <span className="arrow-right"></span>
                <span className="arrow-right"></span>
                <span className="arrow-right"></span>
              </Link>
            </div>
            <div className="horz-ads">
              <a href="https://steffen-laurens.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://steffen-laurens.com/centennial/img/google-ads.jpg" alt="Google Ads" />
              </a>
            </div>
          </React.Fragment>
        }
      </div>
      <div id="all-topics-news-wrapper">
        <div className="latest-news-wrapper">
          <LatestNews url={api.category.latest_news} />
        </div>
        <div id="popular-news-wrapper">
          <Sticky topOffset={-85}>
            <PopularNews url={api.category.popular_news} />
          </Sticky>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryComponent;
