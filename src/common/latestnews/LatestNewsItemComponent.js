import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsItemComponent = (props) => console.log(props) || (
  <div className="col-100 col-featured-news">
    <div className="latest-news-box">
      <Link to={props.article.url} className="latest-news-image" title={props.article.title}>
        <img src={props.article.image.size.medium} alt={props.article.image.caption} />
      </Link>
      <div className="latest-news-summary">
        <Link to={props.article.url} className="title-latest-news" title={props.article.title}>{props.article.title}</Link>
        <p className="article-summary">{props.article.summary.substring(0,140) + '...'}</p>
        <div className="latest-info-writer-box common">
          <p className="writer">Ditulis oleh <Link to={props.article.writer.url}>{props.article.writer.name}</Link></p>
          <p>{props.article.date}</p>
        </div>
        <div className="main-button" onClick={() => props.addArticle(
          {
            userID: '',
            articleID: props.article.id
          },
          props.cancelToken
        )}>Simpan Artikel</div>
      </div>
    </div>
  </div>
);

export default LatestNewsItemComponent;
