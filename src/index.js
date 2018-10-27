import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './react-accelerometer';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


const AwesomeComponent = () => (
    <ReactAccelerometer>
      {(position, rotation) => (
        <ul>
          <li>x: {position.x}</li>
          <li>y: {position.y}</li>
          <li>z: {position.z}</li>
          <li>rotation alpha: {rotation.alpha}</li>
          <li>rotation beta: {rotation.beta}</li>
          <li>rotation gamma: {rotation.gamma}</li>
        </ul>
      )}
    </ReactAccelerometer>
  )
  
  ReactDOM.render(<AwesomeComponent />, document.querySelector('#app'))