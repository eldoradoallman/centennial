import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Functions from '../Functions';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SearchComponent from './SearchComponent';

import './Search.css';

class ConnectedSearch extends Component {
  state = {
    searchParams: this.props.history.location.search,
    title: this.props.history.location.state.searchQuery,
    inputClassName: 'search-title',
    searchQuery: ''
  };
  
  componentWillUnmount() {
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }

  componentDidUpdate(prevProps) {
    const { match, location, history } = this.props;

    if (
      match.url === prevProps.match.url &&
      location.search !== prevProps.location.search
    ) {
      this.setState({
        searchParams: history.location.search,
        title: history.location.state.searchQuery,
        inputClassName: 'search-title',
        searchQuery: ''
      });
    }
  }

  inputOnMouseOver() {
    this.setState({ inputClassName: 'search-title active' });
  }

  inputOnMouseLeave() {
    this.setState({ inputClassName: 'search-title' });
  }

  onInputChange(evt) {
    this.setState({ searchQuery: evt.target.value });
  }

  submitSearch() {
    const { history } = this.props;
    const { searchQuery } = this.state;
    const searchResult = Functions.replaceWhiteSpaces(searchQuery);

    if (searchResult) {
      history.push({
        pathname: '/search',
        search: `?q=${searchResult}`,
        state: { searchQuery: searchQuery }
      });
      this.setState({ searchQuery: '' });
    }
  }

  render() {
    return (
      <SearchComponent {...this.state}
        inputOnMouseOver={this.inputOnMouseOver.bind(this)}
        inputOnMouseLeave={this.inputOnMouseLeave.bind(this)}
        onInputChange={this.onInputChange.bind(this)}
        submitSearch={this.submitSearch.bind(this)}
      />
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
