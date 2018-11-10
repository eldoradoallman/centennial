import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
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
    const apiUrl = `${API.PROFILE}/${this.props.match.params.id}/content`;

    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(apiUrl, this.signal.token);
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
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    this.signal.cancel('Profile Content Api is being canceled');
    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }

  render() {
    const { match } = this.props;
    const { fetching, fetched, profile } = this.state;

    return (
      fetching ?
        <p>Loading Content</p>
      :
      fetched ?
        <ProfileComponent match={match} profile={profile} />
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
