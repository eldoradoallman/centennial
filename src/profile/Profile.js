import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../api';

import { actions as sidebarMenuActions } from '../common/sidebarmenu/SidebarMenuDucks';
import ProfileComponent from './ProfileComponent';

import './Profile.css';

class ConnectedProfile extends Component {
  state = {
    news_detail: {}
  };
  
  componentDidMount() {
    axios.get(api.news_detail.content)
      .then(json => this.setState({
        news_detail: json.data
      }))
      .catch(error => console.log(error));
  }
  
  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  render() {
    return (
      this.state.news_detail.id ?
      <ProfileComponent {...this.state} />
      : 
      <p>Loading Content</p>
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
