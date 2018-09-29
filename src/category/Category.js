import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ScrollToTopOnUpdate from '../ScrollToTopOnUpdate';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
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
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({
        category: this.props.match.params.category,
        subcategories: this.resolveSubCategory(this.props.match.params.category)
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
    const category = this.capitalizeFirstLetter(this.state.category);

    return (
      <div id="home-content" className="page-content-wrapper">
        <ScrollToTopOnUpdate />
        <ScrollToTopOnMount />
        <div className="page-content">
          <div id="title-category-wrapper">
            <h1 className="category-title center">{category}</h1>
          </div>
          <Route
            exact
            path="/category/:category/:subcategory?"
            render={(props) => (
              <CategoryOption {...props} category={this.state.category} subcategories={this.state.subcategories} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Category;
