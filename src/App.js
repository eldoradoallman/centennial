import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './home/Home';
import About from './about/About';
import Topics from './topics/Topics';

import logo from './logo.svg';

const App = () => {
  return (
    <Router>
      <div className="App">
        <img src={logo} width="150" style={{display:'block',margin:'auto'}} alt="React Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

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

export default App;
