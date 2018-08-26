import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as homeActions } from './HomeDucks';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';

import './Home.css';

class ConnectedHome extends Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchHomeContent();
    }
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  render() {
    const { homeFetched, users, getUserData } = this.props;
    console.log(this.props);

    return (
      <div id="home-content" className="page-content-wrapper">
        <div className="page-content">
          <div id="featured-news-wrapper">
            {
              homeFetched &&
              users.map((user, index) => (
                <React.Fragment>
                  <div key={user.id} className={
                    index === 0 ? 'col-50 main-col-featured-news' : 
                    index === 1 || index === 2 ? 'col-50 secondary-col-featured-news' :
                    index > 2 ? 'col-25 col-featured-news' : 'col-featured-news'
                  }>
                    <div className="featured-news-box">
                      <Link to={user.url} className="featured-news-image" title={user.title}>
                        <img src={user.image.size.medium} alt={user.image.caption} />
                      </Link>
                      <div className={
                        index === 0 ? 'main-summary featured-news-summary' :
                        index === 1 || index === 2 ? 'secondary-summary featured-news-summary' : 'featured-news-summary'
                      }>
                        <Link to={user.url} className="title-featured-news">{user.title}</Link>
                        <div className="info-writer-box">
                          <p className="writer">Ditulis oleh <Link to={user.url}>{user.writer.name}</Link></p>
                          <p>{user.date}</p>
                        </div>
                        {
                          user.topics.map((topic, index) => (
                            <Link to={'/' + topic} key={index} className={
                              topic === 'Pop Culture' ? 'pop-culture-topic topic' : 
                              topic === 'Beauty & Fashion' ? 'beauty-topic topic' : 
                              topic === 'Entertainment' ? 'entertainment topic' : 
                              topic === 'Techno' ? 'techno topic' : 
                              topic === 'Games' ? 'games topic' : 'topic'
                            }>{topic}</Link>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  {
                    index === 2 || index === 6 ? <br /> : ''
                  }
                </React.Fragment>
              ))
            }
            {
              homeFetched &&
              <div id="home-va-wrapper" className="view-all-wrapper">
                <Link to="/featured-news" className="view-all">
                  <span className="arrow-left"></span>
                  <span className="arrow-left"></span>
                  <span className="arrow-left"></span>
                  <span className="view-all-link">SEE ALL FEATURED NEWS</span>
                  <span className="arrow-right"></span>
                  <span className="arrow-right"></span>
                  <span className="arrow-right"></span>
                </Link>
              </div>
            }
            {
              homeFetched &&
              <div className="horz-ads">
                <a href="#" target="_blank" rel="noopener">
                  <img src="https://steffen-laurens.com/centennial/img/google-ads.jpg" />
                </a>
              </div>
            }
          </div>
          <button onClick={getUserData}>CLICK ME</button>
        </div>
      </div>
    );
  }
}

ConnectedHome.propTypes = {
  homeFetching: PropTypes.bool.isRequired,
  homeFetched: PropTypes.bool.isRequired,
  homeError: PropTypes.object,
  users: PropTypes.array.isRequired,
  fetchHomeContent: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.home,
  ...state.sidebarMenu
  // selectors implementation
  /* categories: getResourcesGroupedByCategory(state) */
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...homeActions,
    ...sidebarMenuActions
  }, dispatch)
});

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
