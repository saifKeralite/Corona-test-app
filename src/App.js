import React, { Component } from 'react';
import StateLists from './Components/StateLists';
const axios = require('axios').default;
//Context for state data


export default class App extends Component {

  render() {
    return (
      <div className="main">
        <StateLists></StateLists>
      </div>
    )
  }
}