var React = require("react");
var ReactDOM = require("react-dom");
var KeyListener = require('./util/KeyListener');
var Key = require('./components/Key');
var Organ = require('./components/Organ');

var registerKeyEvents = function () {
  document.addEventListener("keyup", KeyListener.keyup);
  document.addEventListener("keydown", KeyListener.keydown);
};

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector('#root');

  registerKeyEvents();
  ReactDOM.render(<Organ />, root);
});
