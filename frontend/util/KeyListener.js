var KeyActions = require("../actions/KeyActions");

var Mapping = {
  49: "C",
  50: "D",
  51: "E",
  52: "F",
  53: "G",
  54: "A",
  55: "B",
  56: "C5"
};

var KeyListener = {
  keyup: function (e) {
    var key = Mapping[e.keyCode];
    KeyActions.keyReleased(key);
  },

  keydown: function (e) {
    var key = Mapping[e.keyCode];
    KeyActions.keyPressed(key);
  }
};

module.exports = KeyListener;
