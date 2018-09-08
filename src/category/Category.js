import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import api from '../api';
import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import CategoryComponent from './CategoryComponent';

import './Category.css';

class ConnectedCategory extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    editorial_picks: []
  }

  componentDidMount() {
    this.setState({ fetching: true });
    axios.get(api.category.content)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        editorial_picks: json.data
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error: error
      }));
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  render() {
    return (
      <CategoryComponent {...this.state} />
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
