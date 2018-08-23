import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header/Header';
import Home from './home/Home';
import About from './about/About';
import Topics from './topics/Topics';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/topics" component={Topics} />
          <Route component={Home} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
