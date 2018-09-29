import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import API from '../_api';
import generalServices from '../_helpers/generalServices';
import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import HomeComponent from './HomeComponent';

import './Home.css';

class ConnectedHome extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    news: []
  };

  fetchingContent() {
    this.setState({ fetching: true });
    generalServices.fetchContent(`${API.HOME}/content`)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        news: json.data.content
      }))
      .catch(error => this.setState({
        fetching: false,
        error
      }));
  }

  componentDidMount() {
    this.fetchingContent();
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  render() {
    return (
      <HomeComponent {...this.state} />
    );
  }
}

ConnectedHome.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
  // selectors implementation
  /* categories: getResourcesGroupedByCategory(state) */
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...sidebarMenuActions
  }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
