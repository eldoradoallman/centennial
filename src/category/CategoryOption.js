import React, { Component } from 'react';
import axios from 'axios';

import api from '../api';
import CategoryOptionComponent from './CategoryOptionComponent';

class CategoryOption extends Component {
  state = {
    url: this.props.match.url,
    fetching: false,
    fetched: false,
    error: null,
    editorial_picks: []
  }

  componentDidMount() {
    console.log(this.props.match);
    this.setState({ fetching: true });
    axios.get(api.category.content)
      .then(json => this.setState({
        fetching: false,
        fetched: true,
        editorial_picks: json.data
      }))
      .catch(error => this.setState({
        fetching: false,
        fetched: false,
        error: error
      }));
  }

  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }
  
  render() {
    return (
      <CategoryOptionComponent {...this.state} />
    );
  }
}

export default CategoryOption;
