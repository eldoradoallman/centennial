import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

import { actions as latestNewsActions } from './LatestNewsDucks';
import LatestNewsComponent from './LatestNewsComponent';

import './LatestNews.css';

class ConnectedLatestNews extends Component {
  state = {
    per: 10,
    page: 1,
    contacts: []
  }

  loadContacts() {
    const { per, page, contacts } = this.state;
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=1`;
    /* const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`; */

    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        page: this.state.page + 1,
        contacts: [ ...contacts, ...json.contacts ]
      }));
  }

  render() {

    return (
      <InfiniteScroll
        dataLength={this.state.contacts.length}
        next={this.loadContacts.bind(this)}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {
          this.state.contacts.map((contact, i) => (
            <li key={i}>
              {contact.name}
            </li>
          ))  
        }
      </InfiniteScroll>
      // <LatestNewsComponent {...this.props} />
    );
  }
}

ConnectedLatestNews.propTypes = {
  latestNewsFetching: PropTypes.bool.isRequired,
  latestNewsFetched: PropTypes.bool.isRequired,
  latestNewsError: PropTypes.object,
  latestNews: PropTypes.array.isRequired,
  fetchLatestNewsContent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.latestNews,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    ...latestNewsActions
  }, dispatch)
});

const LatestNews = connect(mapStateToProps, mapDispatchToProps)(ConnectedLatestNews);

export default LatestNews;
