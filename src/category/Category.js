import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ScrollToTopOnMount from '../ScrollToTopOnMount';
import CategoryOption from './CategoryOption';

import './Category.css';

class Category extends Component {
  state = {
    category: this.props.match.params.category
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
        category: this.props.match.params.category
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
  
  render() {
    const category = this.capitalizeFirstLetter(this.state.category);

    return (
      <div id="home-content" className="page-content-wrapper">
        <ScrollToTopOnMount />
        <div className="page-content">
          <div id="title-category-wrapper">
            <h1 className="category-title center">{category}</h1>
          </div>
          <Route exact path="/category/:category/:subcategory?" component={CategoryOption} />
        </div>
      </div>
    );
  }
}

export default Category;
