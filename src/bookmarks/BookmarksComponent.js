import React from 'react';
import { Link } from 'react-router-dom';

const BookmarksComponent = ({
    removeArticlePending,
    loggedIn,
    user,
    article,
    removeArticle,
    cancelToken
  }) => (
  <div className="col-100 collection-articles">
    <div className="collection-articles-box">
      <div className="writer-info-top bookmarks-writer-info-top clear">
        <Link to={article.writer.url} className="writer-image">
          <img src={article.writer.avatar.small} alt={article.writer.name} />
        </Link>
        <div className="article-writer-info bookmarks-awi">
          <p className="writer">
            Ditulis oleh <Link to={article.writer.url}>{article.writer.name}</Link>
          </p>
          <p className="date">{article.date}</p>
        </div>
        {
          loggedIn &&
          <div className="button-bookmarks-wrapper">
            <ButtonBookmarks
              user={user}
              article={article}
              action={
                !removeArticlePending ?
                  removeArticle
                :
                  () => console.log('Pending Remove Bookmarks')
              }
              cancelToken={cancelToken}
              text={'Hapus dari Bookmarks'}
            />
          </div>
        }
      </div>
      <Link to={article.url} className="article-image" title={article.title}>
        <img src={article.image.size.medium} alt={article.image.caption} />
      </Link>
      <div className="article-summary-wrapper bookmarks-article-summary-wrapper">
        <Link to={article.url} className="title-article bookmarks-title-article" title={article.title}>{article.title}</Link>
        <p className="article-summary-content">{article.summary.substring(0,150) + '...'}</p>
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

export default BookmarksComponent;
