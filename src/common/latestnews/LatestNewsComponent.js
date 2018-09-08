import React from 'react';

import LatestNewsHomeComponent from './LatestNewsHomeComponent';
import LatestNewsItemComponent from './LatestNewsItemComponent';
import LatestNewsTitleComponent from './LatestNewsTitleComponent';

import './LatestNews.css';

const LatestNewsComponent = ({ article, index, page }) => {
  if (page === 'home') {
    if (!article.id) {
      return article.editorial_picks.map((article_pick, index) => (
        <LatestNewsHomeComponent key={article_pick.id} articlepick={article_pick} index={index} />
      ));
    } else {
      return (
        <React.Fragment key={article.id}>
          {
            index % 8 === 0 &&
            <LatestNewsTitleComponent article={article} />
          }
          <LatestNewsItemComponent article={article} />
        </React.Fragment>
      );
    }
  } else {
    return (
      <LatestNewsItemComponent article={article} />
    );
  }
};

export default LatestNewsComponent;
