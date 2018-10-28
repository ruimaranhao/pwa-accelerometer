import React, { Component } from 'react';
import Accelerometer from './Accelerometer';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Accelerometer render={({ alpha }) => (
          <header className="App-header">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{
                transform: `rotate(${Math.round(alpha)}deg)`
              }}
            />
          </header>
        )} />
      </div>
    );
  }
}
