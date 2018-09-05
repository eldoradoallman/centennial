import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as homeActions } from '../home/HomeDucks';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import CategoryComponent from './CategoryComponent';

import './Category.css';

class ConnectedCategory extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchHomeContent();
    }
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  render() {
    const { homeFetched, users, getUserData } = this.props;
    console.log(this.props);

    return (
      <CategoryComponent {...this.props} />
    );
  }
}

ConnectedCategory.propTypes = {
  homeFetching: PropTypes.bool.isRequired,
  homeFetched: PropTypes.bool.isRequired,
  homeError: PropTypes.object,
  users: PropTypes.array.isRequired,
  fetchHomeContent: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.home,
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...homeActions,
    ...sidebarMenuActions
  }, dispatch)
});

const Category = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategory);

export default Category;
