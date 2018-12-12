// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StatsActions from "../actions/stats";
import Home from '../components/Home';


  function mapStateToProps(state){
    // console.log("---------->",state)
    return {
    downloaded_apps : state.stats.downloaded_apps,
    installed_apps : state.stats.installed_apps,
    AllStats : state.stats.AllStats
  }}

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(StatsActions, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Home);
