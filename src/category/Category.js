import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ScrollToTopOnUpdate from '../common/scrolltotop/ScrollToTopOnUpdate';
import ScrollToTopOnMount from '../common/scrolltotop/ScrollToTopOnMount';
import CategoryOption from './CategoryOption';

import './Category.css';

class Category extends Component {
  state = {
    category: this.props.match.params.category,
    subcategories: this.resolveSubCategory(this.props.match.params.category)
  };
  
  shouldComponentUpdate(nextProps) {
    if (this.state.url !== nextProps.match.url) {
      return true;
    }
    return false;
  }
  
  componentDidUpdate(prevProps) {
    const { url, params } = this.props.match;

    if (url !== prevProps.match.url) {
      this.setState({
        category: params.category,
        subcategories: this.resolveSubCategory(params.category)
      });
    }
  }

  capitalizeFirstLetter(string) {
    if (string === 'livestyle') {
      return string = 'Live Style';
    } else if (string === 'about-you') {
      return string = 'About You';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  resolveSubCategory(category) {
    if (category === 'entertainment') {
      return [
        { name: 'LIHAT SEMUA', url: '/category/entertainment'},
        { name: 'POP CULTURE', url: '/category/entertainment/popculture' },
        { name: 'GAMES', url: '/category/entertainment/games' },
        { name: 'EVENT', url: '/category/entertainment/event' },
        { name: 'MUSIC', url: '/category/entertainment/music' }
      ];
    } else if (category === 'livestyle') {
      return [
        { name: 'LIHAT SEMUA', url: '/category/livestyle' },
        { name: 'BEAUTY & FASHION', url: '/category/livestyle/beautyfashion' },
        { name: 'AUTO & SPORTS', url: '/category/livestyle/autosports' },
        { name: 'HANGOUT ZONE', url: '/category/livestyle/hangout' }
      ];
    }
  }
  
  render() {
    const { category, subcategories } = this.state;
    const categoryTitle = this.capitalizeFirstLetter(this.state.category);

    return (
      <div id="home-content" className="page-content-wrapper">
        <ScrollToTopOnUpdate />
        <ScrollToTopOnMount />
        <div className="page-content">
          <div id="title-category-wrapper">
            <h1 className="category-title center">{categoryTitle}</h1>
          </div>
          <Route
            exact
            path="/category/:category/:subcategory?"
            render={(props) => (
              <CategoryOption {...props}
                category={category}
                subcategories={subcategories}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Category;
