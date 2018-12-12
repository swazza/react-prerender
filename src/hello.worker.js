// Respond to message from parent thread
self.addEventListener('message', event => {
  postMessage('Hello, World!');
  console.log(event);
});
