import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import ProfileComponent from './ProfileComponent';

import './Profile.css';

class ConnectedProfile extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    profile: {}
  };
  
  signal = axios.CancelToken.source();
  
  loadContent = async () => {
    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(`${API.PROFILE}/${this.props.match.params.id}/content`, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        profile: data.content
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
    this.signal.cancel('Profile Content Api is being canceled');
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  render() {
    return (
      this.state.fetching ?
      <p>Loading Content</p>
      :
      this.state.fetched ?
      <ProfileComponent match={this.props.match} profile={this.state.profile} />
      : 
      <p>Failed to fetch Content</p>
    );
  }
}

ConnectedProfile.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sidebarMenuActions, dispatch)
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);

export default Profile;
