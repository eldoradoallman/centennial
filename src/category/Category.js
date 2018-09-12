import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

import './Category.css';
import CategoryOption from './CategoryOption';

class ConnectedCategory extends Component {
  state = {
    category: this.props.match.params.category
  };

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
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

ConnectedCategory.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...sidebarMenuActions
  }, dispatch)
});

const Category = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategory);

export default Category;
