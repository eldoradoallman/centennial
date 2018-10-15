import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as userAuthActions } from './_user/userAuthDucks';
import AppRouting from './AppRouting';

class ConnectedApp extends Component {
  render() {
    console.log(this.props);
    return (
      <AppRouting {...this.props} />
    );
  }
}

ConnectedApp.propTypes = {
  registering: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
  errorRegister: PropTypes.any,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.any,
  user: PropTypes.any
};

const mapStateToProps = (state) => ({
  ...state.userAuth
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...userAuthActions
  }, dispatch)
});

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
