import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import generalServices from '../_helpers/generalServices';
import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import CategoryOptionComponent from './CategoryOptionComponent';

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

    try {
      this.setState({ fetching: true });
      const data = await generalServices.fetchContents(`${API.CATEGORY}/${category}${subcategory ? '/' + subcategory : '' }/content`, this.signal.token);
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
    this.signal.cancel('Category Content Api is being canceled');
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      if (this.props.isSidebarOpen) {
        this.props.closeSidebarMenu();
      }
      this.loadContent();
    }
  }
  
  render() {
    const { category, subcategory } = this.props.match.params;
    return (
      <CategoryOptionComponent
        {...this.state}
        category={category}
        subcategory={subcategory}
        subcategories={this.props.subcategories}
        url={this.props.match.url}
      />
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
