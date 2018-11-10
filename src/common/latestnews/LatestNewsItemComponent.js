import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsItemComponent = ({
    loggedIn,
    user,
    article,
    addArticle,
    removeArticle,
    cancelToken
  }) => (
  <div className="col-100 col-featured-news">
    <div className="latest-news-box">
      <Link to={article.url} className="latest-news-image" title={article.title}>
        <img src={article.image.size.medium} alt={article.image.caption} />
      </Link>
      <div className="latest-news-summary">
        <Link to={article.url} className="title-latest-news" title={article.title}>{article.title}</Link>
        <p className="article-summary">{article.summary.substring(0,140) + '...'}</p>
        <div className="latest-info-writer-box common">
          <p className="writer">Ditulis oleh <Link to={article.writer.url}>{article.writer.name}</Link></p>
          <p>{article.date}</p>
        </div>
        {
          loggedIn &&
          <ButtonBookmarks
            user={user}
            article={article}
            action={article.isBookmarked ? removeArticle : addArticle}
            cancelToken={cancelToken}
            text={article.isBookmarked ? "Artikel Tersimpan" : "Simpan Artikel"}
          />
        }
      </div>
    </div>
  </div>
);

const ButtonBookmarks = ({
    user,
    article,
    action,
    cancelToken,
    text
  }) => (
  <div className="main-button"
    onClick={() => {
      const payload = {
        userID: user.id,
        articleID: article.id
      };
      action(payload, cancelToken);
    }}
  >{text}</div>
);

export default LatestNewsItemComponent;
