import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header/Header';
import Home from './home/Home';
import About from './about/About';
import Topics from './topics/Topics';

// To pass props with Route
/* const HomeRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component john="3" {...props}/>
  )}/>
); */

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          {// To pass props with Route
          /* <HomeRoute exact path="/" component={Home}/> */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          <Route component={Home} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
