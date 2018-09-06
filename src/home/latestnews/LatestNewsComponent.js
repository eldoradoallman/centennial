import React from 'react';
import { Link } from 'react-router-dom';

import LatestNewsItemComponent from '../../common/LatestNewsItemComponent';
import LatestNewsTitleComponent from '../../common/LatestNewsTitleComponent';

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
          <LatestNewsTitleComponent article={props.article} />
        }
        <LatestNewsItemComponent article={props.article} />
      </React.Fragment>
    );
  }
};

export default LatestNewsComponent;
