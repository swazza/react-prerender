import React, { Component, Fragment } from 'react';
import { PrerenderedContent } from './PrerenderedContent';
import Worker from './hello.worker.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      content: 'Nothing has been prerendered yet'
    };

    this.worker = new Worker();
    this.worker.onmessage = function(event) {
      const { data: content } = event;
      this.setState({ content });
    }.bind(this);
  }

  onButtonClick() {
    this.worker.postMessage({ a: 1 });
  }

  render() {
    const { content } = this.state;
    return (
      <Fragment>
        <button onClick={this.onButtonClick.bind(this)}>Get Message</button>
        <PrerenderedContent content={content} />
      </Fragment>
    );
  }
}

export default App;
