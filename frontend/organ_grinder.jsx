var React = require("react");
var ReactDOM = require("react-dom");
var KeyListener = require('./util/key_listener');
var Organ = require('./components/organ');

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("keyup", KeyListener.keyup);
  document.addEventListener("keydown", KeyListener.keydown);

  ReactDOM.render(
    <Organ />,
    document.querySelector('#root')
  );
});
