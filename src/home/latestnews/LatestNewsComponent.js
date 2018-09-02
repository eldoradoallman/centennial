import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsComponent = (props) => {
  if (!props.article.id) {
    return props.article.editorial_picks.map((article_pick, index) => (
      <React.Fragment key={article_pick.id}>
        {
          index == 0 &&
          <div className="margin-top"></div>
        }
        <div className={
          index === 0 || index === 1 ? 'col-50 main-col-featured-news' : 'col-100 secondary-col-featured-news'
        }>
          <div className="featured-news-box">
            <Link to={article_pick.url} className="featured-news-image" title={article_pick.title}>
              <img src={article_pick.image.size.medium} alt={article_pick.image.caption} />
            </Link>
            <div className={
              index === 0 || index === 1 ? 'main-summary latest-news-summary' : 'latest-news-summary full'
            }>
              <Link to={article_pick.url} className="title-featured-news alt-title" title={article_pick.title}><span>{article_pick.title}</span></Link>
              <div className="latest-info-writer-box">
                <p className="writer">Ditulis oleh <Link to={article_pick.url}>{article_pick.writer.name}</Link></p>
                <p>{article_pick.date}</p>
              </div>
              {
                article_pick.topics.map((topic, index) => (
                  <Link to={'/' + topic} key={index} className={
                    topic === 'Pop Culture' ? 'pop-culture-topic topic' : 
                    topic === 'Beauty & Fashion' ? 'beauty-topic topic' : 
                    topic === 'Entertainment' ? 'entertainment topic' : 
                    topic === 'Techno' ? 'techno topic' : 
                    topic === 'Games' ? 'games topic' : 
                    topic === 'Movies' ? 'movies topic' : 'topic'
                  }>{topic}</Link>
                ))
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  } else {
    return (
      <React.Fragment key={props.article.id}>
        {
          props.index % 8 === 0 &&
          <div className="category-news-wrapper clear">
            <h4 className="category-news">{props.article.topic}</h4>
            <div className="view-all-category view-all-wrapper">
              <Link to={props.article.url_topic} className="view-all">
                <span className="arrow-left"></span>
                <span className="arrow-left"></span>
                <span className="arrow-left"></span>
                <span className="view-all-link">LIHAT SELURUHNYA</span>
              </Link>
            </div>
            <div className="border"></div>
          </div>
        }
        <div className="col-100 col-featured-news">
          <div className="latest-news-box">
            <Link to={props.article.url} className="latest-news-image" title={props.article.title}>
              <img src={props.article.image.size.medium} alt={props.article.image.caption} />
            </Link>
            <div className="latest-news-summary">
              <Link to={props.article.url} className="title-latest-news" title={props.article.title}>{props.article.title}</Link>
              <p className="article-summary">{props.article.summary.substring(0,140) + '...'}</p>
              <div className="latest-info-writer-box common">
                <p className="writer">Ditulis oleh <Link to={props.article.url}>{props.article.writer.name}</Link></p>
                <p>{props.article.date}</p>
              </div>
              <div className="main-button">Simpan Artikel</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default LatestNewsComponent;
