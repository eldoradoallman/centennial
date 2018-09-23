import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import API from '../_api';
import generalServices from '../_helpers/generalServices';
import { actions as homeActions } from './HomeDucks';
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
    generalServices.fetchContent(API.HOME.CONTENT)
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
  // selectors implementation
  /* categories: getResourcesGroupedByCategory(state) */
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...homeActions,
    ...sidebarMenuActions
  }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
