// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StatsActions from "../actions/stats";
import Home from '../components/Home.jsx';


  const mapStateToProps = ({ downloaded_apps, installed_apps, AllStats }) => ({
    downloaded_apps, installed_apps, AllStats
  })

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(StatsActions, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Home);
