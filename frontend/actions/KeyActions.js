var AppDispatcher = require("../dispatcher/Dispatcher");

var KeyActions = {
  keyReleased: function (key) {
    AppDispatcher.dispatch({
      actionType: "REMOVE_KEY",
      noteName: key
    });
  },

  keyPressed: function (key) {
    AppDispatcher.dispatch({
      actionType: "ADD_KEY",
      noteName: key
    });
  },

  playback: function (keys) {
    AppDispatcher.dispatch({
      actionType: "SET_KEYS",
      keys: keys
    });
  }
};

module.exports = KeyActions;
