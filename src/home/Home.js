import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';
import { actions as homeActions } from './HomeDucks';

class ConnectedHome extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchHomeContent();
    }
  }
  
  render() {
    const { users, getUserData } = this.props;
    console.log(this.props);

    return (
      <div id="home-content">
        <h2>Home</h2>
        {
          users[0] &&
          users.map((user, index) => (
            <p key={index}>{user.name}</p>
          ))
        }
        <button onClick={getUserData}>CLICK ME</button>
      </div>
    );
  }
}

ConnectedHome.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  error: PropTypes.object,
  users: PropTypes.array.isRequired,
  fetchHomeContent: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.home
  // selectors implementation
  /* categories: getResourcesGroupedByCategory(state) */
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(homeActions, dispatch)
});

// to dispatch actions of different ducks
/* const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...homeActions,
    ...navigationActions
  }, dispatch)
}); */

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
