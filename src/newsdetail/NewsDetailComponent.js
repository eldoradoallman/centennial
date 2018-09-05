import React from 'react';
import { Link } from 'react-router-dom';

import ScrollToTopOnMount from '../ScrollToTopOnMount';

const NewsDetailComponent = ({ news_detail }) => (
  <div id="news-detail" className="page-content-wrapper">
    <ScrollToTopOnMount />
    <div id="title-writer-wrapper">
      <Link to="/entertainment">{news_detail.category}</Link><span>/</span><Link to="/entertainment/movies">{news_detail.sub_category}</Link>
      <h1 className="news-title">{news_detail.title}</h1>
      <p>Ditulis oleh <Link to={news_detail.writer.url}>{news_detail.writer.name}</Link></p>
      <p>{news_detail.date}</p>
    </div>
    <div id="news-main-image">
      <img src={news_detail.image.size.medium} alt={news_detail.image.alt} />
      <div className="image-caption">{news_detail.image.caption}</div>
    </div>
    <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: news_detail.html_content }} />
  </div>
);

export default NewsDetailComponent;
