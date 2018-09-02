import React from 'react';
import { Link } from 'react-router-dom';

const PopularNewsComponent = (props) => {
  const { popular_news } = props;
  
  return (
    <React.Fragment>
      <div className="category-news-wrapper clear">
        <h4 className="category-news">Artikel Populer</h4>
        <div className="border"></div>
      </div>
      {
        popular_news.length > 0 &&
        popular_news.map((article, index) => (
          <div className="col-100 col-featured-news">
            <div className="latest-news-box">
              <Link to={article.url} className="latest-news-image popular" title={article.title}>
                <img src={article.image.size.medium} alt={article.image.caption} />
              </Link>
              <div className="latest-news-summary popular">
                <Link to={article.url} className="title-latest-news" title={article.title}>{article.title}</Link>
                <div className="latest-info-writer-box common">
                  <p className="writer">Ditulis oleh <Link to={article.url}>{article.writer.name}</Link></p>
                  <p>{article.date}</p>
                </div>
              </div>
            </div>
          </div>
        )) 
      }
    </React.Fragment>
  );
};

export default PopularNewsComponent;
