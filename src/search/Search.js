import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Functions from '../Functions';
import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import SearchComponent from './SearchComponent';

import './Search.css';

class ConnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: props.history.location.search,
      title: this.resolveTitle(),
      inputClassName: 'search-title',
      searchQuery: ''
    };
  }

  resolveTitle() {
    const historyStateObject = this.props.history.location.state;
    
    if (historyStateObject) {
      return historyStateObject.searchQuery;
    }
    return decodeURIComponent(this.props.history.location.search.substring(3));
  }

  async inputOnMouseOver() {
    await this.setState({ inputClassName: 'search-title active' });
  }

  async inputOnMouseLeave() {
    await this.setState({ inputClassName: 'search-title' });
  }

  async onInputChange(evt) {
    await this.setState({ searchQuery: evt.target.value });
  }

  async submitSearch() {
    const { history } = this.props;
    const { searchQuery } = this.state;
    const searchResult = Functions.replaceWhiteSpaces(searchQuery);
    const historyObject = {
      pathname: '/search',
      search: `?q=${searchResult}`,
      state: { searchQuery: searchQuery }
    };

    if (searchResult) {
      history.push(historyObject);
      await this.setState({ searchQuery: '' });
    }
  }

  componentWillUnmount() {
    const { isSidebarOpen, closeSidebarMenu } = this.props;

    if (isSidebarOpen) {
      closeSidebarMenu();
    }
  }

  async componentDidUpdate(prevProps) {
    const { match, location, history } = this.props;

    if (
      match.url === prevProps.match.url &&
      location.search !== prevProps.location.search
    ) {
      await this.setState({
        searchParams: history.location.search,
        title: history.location.state.searchQuery,
        inputClassName: 'search-title',
        searchQuery: ''
      });
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
