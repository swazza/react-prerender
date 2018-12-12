import React, { Component } from 'react';
import Worker from './hello.worker.js';

const worker = new Worker();
worker.onmessage = function(event) {
  console.log(event);
};

class App extends Component {
  onButtonClick() {
    worker.postMessage({ a: 1 });
  }

  render() {
    return <button onClick={this.onButtonClick.bind(this)}>Get Message</button>;
  }
}

export default App;
