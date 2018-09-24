import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Sticky from 'react-sticky-el';

import API from '../_api';
import LatestNews from '../common/latestnews/LatestNews';
import PopularNews from '../common/popularnews/PopularNews';

const CategoryOptionComponent = ({
  fetching,
  fetched,
  error,
  editorial_picks,
  url
}) => (
  <React.Fragment>
    <div id="sub-category-links-wrapper">
      <div id="sub-category-links-content">
        {
          fetched &&
          editorial_picks[0].subcategory.map((sub, index) => (
            <NavLink
              key={sub.name}
              to={sub.url}
              exact
              activeClassName="current"
              className="sub-category-link"
            >{sub.name}</NavLink>
          ))
        }
      </div>
    </div>
    <div id="featured-news-wrapper">
      {
        fetched &&
        editorial_picks.map((article, index) => (
          <React.Fragment key={article.id}>
            <div className={
              index === 0 ? 'col-100 main-col-featured-news' : 'col-25 col-featured-news'
            }>
              <div className="featured-news-box category-box clear">
                <div id={
                  index === 0 ? 'category-image-wrapper' : ''
                } className="category-image">
                  <Link to={article.url} className="featured-news-image" title={article.title}>
                    <img src={article.image.size.medium} alt={article.image.caption} />
                  </Link>
                </div>
                <div className={
                  index === 0 ? 'main-summary category-news-summary' : 'category-items-summary'
                }>
                  <Link to={article.url} className="title-category-news" title={article.title}>
                    <span>{article.title}</span>
                  </Link>
                  <div className="info-writer-box">
                    {
                      index === 0 ?
                      <p className="summary">{article.summary.substring(0,250) + '...'}</p> : ''
                    }
                    <p className="writer">Ditulis oleh <Link to={article.writer.url}>{article.writer.name}</Link></p>
                    <p className="date">{article.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))
      }
      {
        fetched &&
        <React.Fragment>
          <div id="category-va-wrapper" className="view-all-wrapper"></div>
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
        <div className="category-news-wrapper clear">
          <h4 className="category-news">Artikel Terbaru</h4>
          <div className="border"></div>
        </div>
        <LatestNews url={API.CATEGORY.LATEST_NEWS} urlLocation={url} />
      </div>
      <div id="popular-news-wrapper">
        <Sticky topOffset={-85}>
          <PopularNews url={API.CATEGORY.POPULAR_NEWS} />
        </Sticky>
      </div>
    </div>
  </React.Fragment>
);

export default CategoryOptionComponent;
