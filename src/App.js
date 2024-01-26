// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';

import React, { Component } from 'react'
import News from './component/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News country="in"/>
      </div>
    )
  }
}