import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../api';

import { actions as sidebarMenuActions } from '../sidebarmenu/SidebarMenuDucks';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import NewsDetailComponent from './NewsDetailComponent';

import './NewsDetail.css';

class ConnectedNewsDetail extends Component {
  state = {
    news_detail: [],
    news_content: '<p><a href=\"http:\/\/centennial.id\"><strong>Centennial.id<\/strong><\/a>&nbsp;\u2013 Aquaman&nbsp;menjadi salah satu film DCEU&nbsp;yang dinantikan. Kisah sang manusia laut dari Atlantis ini tidak banyak terungkap hingga&nbsp;Justice League&nbsp;sekalipun.&nbsp;Dari DC movie sendiri hanya mengungkapkan bahwa film ini akan tayang di bulan Desember. Namun tim di balik layar begitu merahasiakan rincian film ini.<\/p><p>Beberapa bocoran dirilis oleh Entertainment Weekly salah satunya&nbsp;kemunculan musuh besar Aquaman yaitu Black Manta. Berdasarkan penjelasan&nbsp;Entertainment Weekly, dia adalah seorang tentara bayaran dan seorang bajak laut dengan nama David Kane. Black Manta akan diperankan oleh Yahya Abdul-Mateen II. Penjelasan singkat dari Direktur James Wan hanya menggambarkannya sebagai, \u201Cpart time tentara bayaran tetapi full time bajak laut. Penampilannya akan terlihat seperti alien gila dari luar angkasa.<\/p><p>Meskipun menjadi musuh Aquaman, Black Manta tidak akan menjadi penjahat utama dalam film. Peran antagonis utama dalam film ini adalah Orm yang diperankan oleh Patrick Wilson. Dalam versi komik, Orm adalah saudara tiri Aquaman.<\/p><p><em>Aquaman<\/em>&nbsp;akan tayang di bioskop pada 21 Desember 2018. Namun kita tidak perlu penasaran selama itu, karena&nbsp;<em>trailer premiere Aquaman<\/em>&nbsp;akan tayang pada San Diego Comic Con nanti!<\/p>'
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
      <div id="news-detail" className="page-content-wrapper">
        <ScrollToTopOnMount />
        <div id="title-writer-wrapper">
          <Link to="/entertainment">Entertainment</Link><span>/</span><Link to="/entertainment/movies">Movies</Link>
          <h1 className="news-title">DC Bikin Film Aquaman, Black Manta Dan Orm Jadi Musuhnya?</h1>
          <p>Ditulis oleh <Link to="/tes">Joshua David Stein</Link></p>
          <p>5 Agustus 2018</p>
        </div>
        <div id="news-main-image">
          <img src="https://steffen-laurens.com/centennial/img/aquaman.jpg" alt="Aquaman The Movie" />
          <div className="image-caption">The team at Warners Bros. and DC are really confident that their next big release, Aquaman, is going to swim not sink.</div>
        </div>
        <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: this.state.news_content }} />
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
