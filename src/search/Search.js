import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import API from '../_api';
import Services from '../Services';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SearchComponent from './SearchComponent';

import './Search.css';

class ConnectedSearch extends Component {
  state = {
    fetching: false,
    fetched: false,
    error: null,
    news_detail: {}
  };
  
  signal = axios.CancelToken.source();
  
  loadContent = async () => {
    try {
      this.setState({ fetching: true });
      const data = await Services.fetchContent(API.NEWS_DETAIL, this.signal.token);
      console.log(data.message);
      this.setState({
        fetching: false,
        fetched: true,
        news_detail: data.content
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        this.setState({
          fetching: false,
          fetched: false,
          error
        });
      }
    }
  }
  
  componentDidMount() {
    console.log(this.props);
    this.loadContent();
  }
  
  componentWillUnmount() {
    this.signal.cancel('News Detail Content Api is being canceled');
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  resolveSubCategory(string) {
    if (string === 'popculture') {
      return 'POP CULTURE';
    } else if (string === 'beautyfashion') {
      return 'BEAUTY & FASHION';
    } else if (string === 'autosports') {
      return 'AUTO & SPORTS';
    } else if (string === 'hangout') {
      return 'HANGOUT ZONE';
    }
  }

  render() {
    const { history } = this.props;
    const { sub_category } = this.state.news_detail;
    return (
      this.state.news_detail.id ?
        <SearchComponent {...this.state}
          title={history.location.state.searchQuery}
          sub_category={this.resolveSubCategory(sub_category)}
        />
      : 
        <p>Loading Content</p>
    );
  }
}

ConnectedSearch.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
  closeSidebarMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.sidebarMenu
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sidebarMenuActions, dispatch)
});

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);

export default Search;
