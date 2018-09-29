import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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

  fetchContent() {
    const { category, subcategory } = this.props.match.params;
    this.setState({ fetching: true });
    generalServices.fetchContent(`${API.CATEGORY}/${category}${subcategory ? '/' + subcategory : '' }/content`)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        editorial_picks: json.data.content
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error: error
      }));
  }

  componentDidMount() {
    this.fetchContent();
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.fetchContent();
      if (this.props.isSidebarOpen) {
        this.props.closeSidebarMenu();
      }
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
