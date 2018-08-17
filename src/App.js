import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';

const FETCH_USERS = 'FETCH_USERS';

const fetchUsersActionCreator = (actionType, apiUrl) => ({
  type: actionType,
  payload: axios.get(apiUrl)
});

const ConnectedApp = (props) => {
  const { state, fetchUsers } = props;

  return (
    <Router>
      <div className="App">
        <img src={logo} width="150" style={{display:'block',margin:'auto'}} alt="React Logo" />
        {state.users.users[0] ? <p>{state.users.users[0].name}</p> : ''}
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
        <button onClick={() => fetchUsers(state.users.users)}>CLICK ME</button>

        <hr />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          <Route component={Home} />
        </Switch>
      </div>
    </Router>);
};

ConnectedApp.propTypes = {
  state: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (users) => {
      if (users.length === 0) {
        dispatch(fetchUsersActionCreator(FETCH_USERS, 'https://jsonplaceholder.typicode.com/users'));
      }
    }
  };
};

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${match.url}/components`}>Components</Link></li>
      <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
