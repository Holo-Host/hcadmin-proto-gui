
import React, { Component } from 'react';
import logo from './holo-logo.svg';
import './App.css';
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Main } from "./components/main";

class App extends Component {
  render() {
    return (
      <div>
        <Main/>
     </div>
    );
  }
}

export default App;
