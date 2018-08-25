import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { actions as aboutActions } from './AboutDucks';

class ConnectedAbout extends Component {
  componentDidMount() {
    this.props.changeName('Duane Allman');
  }
  
  render() {
    const { name, age, changeAge } = this.props;
    console.log(this.props);

    return (
      <div id="entertainment-content" className="page-content-wrapper">
        <div className="page-content">
          <h2>About</h2>
          <p>name: <b>{name}</b></p>
          <p>age: <b>{age}</b></p>
          <button onClick={changeAge}>CLICK ME</button>
        </div>
      </div>
    );
  }
}

ConnectedAbout.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  changeName: PropTypes.func.isRequired,
  changeAge: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ...state.about
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(aboutActions, dispatch)
});

const About = connect(mapStateToProps, mapDispatchToProps)(ConnectedAbout);

export default About;
