import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsTitleComponent = ({ article }) => (
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
);

export default LatestNewsTitleComponent;
