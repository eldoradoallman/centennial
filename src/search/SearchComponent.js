import React from 'react';

import API from '../_api';
import ScrollToTopOnMount from '../common/scrolltotop/ScrollToTopOnMount';
import LatestNews from '../common/latestnews/LatestNews';

const SearchComponent = ({
    title,
    searchParams,
    inputClassName,
    inputOnMouseOver,
    inputOnMouseLeave,
    onInputChange,
    submitSearch
  }) => (
  <div id="search" className="page-content-wrapper">
    <ScrollToTopOnMount />
    <div id="title-search-wrapper">
      <h4 className="search-result">Berikut adalah hasil pencarianmu berdasarkan 'kata kunci':</h4>
      <input
        className={inputClassName}
        type="text"
        placeholder={title}
        onMouseOver={inputOnMouseOver}
        onMouseLeave={inputOnMouseLeave}
        onChange={onInputChange}
        onKeyPress={(evt) => evt.key === 'Enter' && submitSearch(evt)}
      />
    </div>
    <div className="search-content-wrapper">
      <LatestNews url={`${API.SEARCH}`} searchParams={searchParams} />
    </div>
  </div>
);

export default SearchComponent;
