import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginPopup from './loginpopup/LoginPopup';
import Header from './header/Header';
import Home from './home/Home';
import Search from './search/Search';
import Bookmarks from './bookmarks/Bookmarks';
import Category from './category/Category';
import NewsDetail from './newsdetail/NewsDetail';
import Profile from './profile/Profile';

const AppRouting = ({ loggedIn, user }) => (
  <Router>
    <React.Fragment>
      <LoginPopup />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/bookmarks" render={(props) => {
          if (loggedIn) {
            return (
              <Bookmarks user={user} />
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            );
          }
        }} />
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
