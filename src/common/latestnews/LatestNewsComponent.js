import React from 'react';

import LatestNewsHomeComponent from './LatestNewsHomeComponent';
import LatestNewsItemComponent from './LatestNewsItemComponent';
import LatestNewsTitleComponent from './LatestNewsTitleComponent';

import './LatestNews.css';

const LatestNewsComponent = (props) => {
  if (props.page === 'home') {
    if (!props.article.id) {
      return props.article.editorial_picks.map((article_pick, index) => (
        <LatestNewsHomeComponent
          key={article_pick.id}
          articlepick={article_pick}
          index={index}
        />
      ));
    } else {
      return (
        <React.Fragment key={props.article.id}>
          {
            props.index % 8 === 0 &&
            <LatestNewsTitleComponent article={props.article} />
          }
          <LatestNewsItemComponent {...props} />
        </React.Fragment>
      );
    }
  } else {
    return (
      <LatestNewsItemComponent {...props} />
    );
  }
};

export default LatestNewsComponent;
