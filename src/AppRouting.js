import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPopup from './loginpopup/LoginPopup';
import Header from './common/header/Header';
import Home from './home/Home';
import Category from './category/Category';
import NewsDetail from './newsdetail/NewsDetail';
import Profile from './profile/Profile';

// To pass props with Route
/* const HomeRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component john="3" {...props}/>
  )}/>
); */

const AppRouting = () => (
  <Router>
    <React.Fragment>
      <LoginPopup />
      <Header />
      <Switch>
        {// To pass props with Route
        /* <HomeRoute exact path="/" component={Home}/> */}
        <Route exact path="/" component={Home} />
        <Route path="/author/:id/:name" component={Profile} />
        <Route 
          path="/category/:category(entertainment|livestyle|techno|about-you|ideas)/:subcategory?/:id-:newstitle"
          component={NewsDetail}
        />
        <Route
          path="/category/:category(entertainment|livestyle|techno|about-you|ideas)"
          component={Category}
        />
        <Route component={Home} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AppRouting;
