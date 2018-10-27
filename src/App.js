import React, { Component } from 'react';
import './App.css';
import Accelerometer from './Accelerometer';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Accelerometer render={({ x, y, z, alpha, beta, gamma }) => (
          <ul>
            <li>x: {x}</li>
            <li>y: {y}</li>
            <li>z: {z}</li>
            <li>rotation alpha: {alpha}</li>
            <li>rotation beta: {beta}</li>
            <li>rotation gamma: {gamma}</li>
          </ul>)}
        />
      </div>
    );
  }
}
