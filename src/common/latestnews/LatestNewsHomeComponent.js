import React from 'react';
import { Link } from 'react-router-dom';

const LatestNewsHomeComponent = (props) => (
  <React.Fragment key={props.articlepick.id}>
    {
      props.index === 0 &&
      <div className="margin-top"></div>
    }
    <div className={
      props.index === 0 || props.index === 1 ? 'col-50 main-col-featured-news' : 'col-100 secondary-col-featured-news'
    }>
      <div className="featured-news-box">
        <Link to={props.articlepick.url} className="featured-news-image" title={props.articlepick.title}>
          <img src={props.articlepick.image.size.medium} alt={props.articlepick.image.caption} />
        </Link>
        <div className={
          props.index === 0 || props.index === 1 ? 'main-summary latest-news-summary' : 'latest-news-summary full'
        }>
          <Link to={props.articlepick.url} className="title-featured-news alt-title" title={props.articlepick.title}><span>{props.articlepick.title}</span></Link>
          <div className="latest-info-writer-box">
            <p className="writer">Ditulis oleh <Link to={props.articlepick.writer.url}>{props.articlepick.writer.name}</Link></p>
            <p>{props.articlepick.date}</p>
          </div>
          {
            props.articlepick.topics.map((topic, index) => (
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
