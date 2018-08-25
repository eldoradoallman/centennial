import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SidebarMenuComponent from './SidebarMenuComponent';

class ConnectedSidebarMenu extends Component {
  render() {
    const { isSidebarOpen } = this.props;

    return (
      <SidebarMenuComponent isSidebarOpen={isSidebarOpen} />
    );
  }
}

ConnectedSidebarMenu.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
});

const SidebarMenu = withRouter(connect(mapStateToProps)(ConnectedSidebarMenu));

export default SidebarMenu;
