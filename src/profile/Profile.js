import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import API from '../_api';
import generalServices from '../_helpers/generalServices';
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

  fetchingContent() {
    this.setState({ fetching: true });
    generalServices.fetchContent(API.PROFILE.CONTENT)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        profile: json.data.content
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
