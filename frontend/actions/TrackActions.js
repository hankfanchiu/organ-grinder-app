var AppDispatcher = require("../dispatcher/Dispatcher");

var TrackActions = {
  addTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: "ADD_TRACK",
      track: track
    });
  },

  deleteTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: "DELETE_TRACK",
      track: track
    });
  }
};

module.exports = TrackActions;
