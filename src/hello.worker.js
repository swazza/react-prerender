import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const Hello = () => <div>Hello, World!</div>;
const staticHtml = renderToStaticMarkup(<Hello />);

// Respond to message from parent thread
self.addEventListener('message', event => {
  postMessage(staticHtml);
  console.log(event);
});
