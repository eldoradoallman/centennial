import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';
import { actions as homeActions } from './HomeDucks';

class ConnectedHome extends Component {
  componentDidMount() {
    if (this.props.state.home.users.length === 0) {
      this.props.fetchHomeContent('https://jsonplaceholder.typicode.com/users')
    }
  }
  
  render() {
    const { state, getUserData } = this.props;
    console.log(this.props);

    return (
      <div>
        <h2>Home</h2>
        {state.home.users[0] ? <p>{state.home.users[0].name}</p> : ''}
        <button onClick={getUserData}>CLICK ME</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...homeActions
  }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
