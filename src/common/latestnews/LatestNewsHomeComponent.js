import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsHomeComponent = ({ articlepick, index }) => (
  <React.Fragment key={articlepick.id}>
    {
      index === 0 &&
      <div className="margin-top"></div>
    }
    <div className={
      index === 0 || index === 1 ? 'col-50 main-col-featured-news' : 'col-100 secondary-col-featured-news'
    }>
      <div className="featured-news-box">
        <Link to={articlepick.url} className="featured-news-image" title={articlepick.title}>
          <img src={articlepick.image.size.medium} alt={articlepick.image.caption} />
        </Link>
        <div className={
          index === 0 || index === 1 ? 'main-summary latest-news-summary' : 'latest-news-summary full'
        }>
          <Link to={articlepick.url} className="title-featured-news alt-title" title={articlepick.title}><span>{articlepick.title}</span></Link>
          <div className="latest-info-writer-box">
            <p className="writer">Ditulis oleh <Link to={articlepick.writer.url}>{articlepick.writer.name}</Link></p>
            <p>{articlepick.date}</p>
          </div>
          {
            articlepick.topics.map((topic, index) => (
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
);

export default LatestNewsHomeComponent;
