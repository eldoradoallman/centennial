import React from 'react';
import { Link } from 'react-router-dom';

const NewsDetailComponent = ({ news_detail, sub_category }) => (
  <React.Fragment>
    <div id="title-writer-wrapper">
      <div className="breadcrumb">
        <Link to={`/category/${news_detail.category}`}>{news_detail.category}</Link>
        {
          news_detail.sub_category &&
          <React.Fragment>
            <span>/</span>
            <Link to={`/category/${news_detail.category}/${news_detail.sub_category}`}>{sub_category}</Link>
          </React.Fragment>
        }
      </div>
      <h1 className="news-title">{news_detail.title}</h1>
      <Link to={news_detail.writer.url} className="writer-avatar">
        <img src={news_detail.writer.avatar.small} alt={news_detail.writer.name} />
      </Link>
      <p>Ditulis oleh</p>
      <p><Link to={news_detail.writer.url} className="writer">{news_detail.writer.name}</Link></p>
      <p>{news_detail.date}</p>
    </div>
    <div id="news-main-image">
      <img src={news_detail.image.size.medium} alt={news_detail.image.alt} />
      <div className="image-caption">{news_detail.image.caption}</div>
    </div>
    <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: news_detail.html_content }} />
  </React.Fragment>
);

export default NewsDetailComponent;
