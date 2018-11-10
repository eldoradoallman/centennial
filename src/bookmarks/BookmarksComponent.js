import React from 'react';
import { Link } from 'react-router-dom';

const BookmarksComponent = ({ article, index }) => (
  <div key={index} className="col-100 collection-articles">
    <div className="collection-articles-box">
      <div className="writer-info-top clear">
        <Link to={article.writer.url} className="writer-image">
          <img src={article.writer.avatar.small} alt={article.writer.name} />
        </Link>
        <div className="article-writer-info">
          <p className="writer">
            Ditulis oleh <Link to={article.writer.url}>{article.writer.name}</Link>
          </p>
          <p className="date">{article.date}</p>
        </div>
      </div>
      <Link to={article.url} className="article-image" title={article.title}>
        <img src={article.image.size.medium} alt={article.image.caption} />
      </Link>
      <div className="article-summary-wrapper">
        <Link to={article.url} className="title-article bookmarks-title-article" title={article.title}>{article.title}</Link>
        <p className="article-summary-content">{article.summary.substring(0,150) + '...'}</p>
      </div>
    </div>
  </div>
);

export default BookmarksComponent;
