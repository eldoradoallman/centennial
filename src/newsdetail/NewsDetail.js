import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../api';

import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import NewsDetailComponent from './NewsDetailComponent';

import './NewsDetail.css';

class ConnectedNewsDetail extends Component {
  state = {
    news_detail: []
  };
  
  componentDidMount() {
    const url = api.news_detail.content;

    axios.get(url)
      .then(json => this.setState({
        news_detail: json.data
      }))
      .catch(error => console.log(error));
  }
  
  componentWillUnmount() {
    if (this.props.isSidebarOpen) {
      this.props.closeSidebarMenu();
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state.news_detail);

    return (
      <div className="page-content-detail-wrapper">
        <div id="title-writer-wrapper">
          <Link to="/entertainment">Entertainment</Link>
          <h1 className="news-title">DC Bikin Film Aquaman, Black Manta Dan Orm Jadi Musuhnya?</h1>
          <p>Ditulis oleh <Link to="/tes">Joshua David Stein</Link></p>
          <p>5 Agustus 2018</p>
        </div>
        <div id="news-main-image">
          <img src="https://steffen-laurens.com/centennial/img/aquaman.jpg" alt="Aquaman The Movie" />
        </div>
      </div>
      /* <NewsDetailComponent {...this.state} /> */
    );
  }
}

ConnectedNewsDetail.propTypes = {
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

const NewsDetail = connect(mapStateToProps, mapDispatchToProps)(ConnectedNewsDetail);

export default NewsDetail;
