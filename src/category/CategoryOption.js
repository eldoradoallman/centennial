import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import CategoryOptionComponent from './CategoryOptionComponent';
import LoaderComponent from '../common/loader/LoaderComponent';

class ConnectedCategoryOption extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    editorial_picks: []
  }
  
  signal = axios.CancelToken.source();
  
  loadContent = async () => {
    const { category, subcategory } = this.props.match.params;
    const apiUrl = `${API.CATEGORY}/${category}${subcategory ? '/' + subcategory : '' }/content`;

    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        editorial_picks: data.content
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        this.setState({
          fetching: false,
          fetched: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.loadContent();
  }

  componentWillUnmount() {
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    this.signal.cancel('Category Content Api is being canceled');
    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }
  
  componentDidUpdate(prevProps) {
    const { match, isSidebarOpen, closeSidebarMenu } = this.props;

    if (match.url !== prevProps.match.url) {
      if (isSidebarOpen) {
        closeSidebarMenu();
      }
      this.loadContent();
    }
  }

  render() {
    const { subcategories, match } = this.props;
    const { category, subcategory } = this.props.match.params;
    const { fetching } = this.state;
    
    return (
      <React.Fragment>
        <div id="sub-category-links-wrapper">
          <div id="sub-category-links-content">
            {
              subcategories &&
              subcategories.map((sub, index) => (
                <NavLink
                  key={sub.name}
                  to={sub.url}
                  exact
                  activeClassName="current"
                  className="sub-category-link"
                >{sub.name}</NavLink>
              ))
            }
          </div>
        </div>
        {
          fetching ?
            <LoaderComponent />
          :
            <CategoryOptionComponent {...this.state}
              category={category}
              subcategory={subcategory}
              url={match.url}
            />
        }
      </React.Fragment>
    );
  }
}

ConnectedCategoryOption.propTypes = {
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

const CategoryOption = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategoryOption);

export default CategoryOption;
