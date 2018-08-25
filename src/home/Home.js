import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as homeActions } from './HomeDucks';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';

class ConnectedHome extends Component {
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
    const { users, getUserData } = this.props;
    console.log(this.props);

    return (
      <div id="home-content" className="page-content-wrapper">
        <div className="page-content">
          {
            users[0] &&
            users.map((user, index) => (
              <p key={index}>{user.name}</p>
            ))
          }
          <button onClick={getUserData}>CLICK ME</button>
        </div>
      </div>
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
