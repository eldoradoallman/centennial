import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
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
  
  signal = axios.CancelToken.source();
  
  loadContent = async () => {
    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(`${API.HOME}/content`, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        news: data.content
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
    this.signal.cancel('Home Content Api is being canceled');
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
