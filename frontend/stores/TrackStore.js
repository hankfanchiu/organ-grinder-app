var Store = require('flux/utils').Store;
var AppDispatcher = require("../dispatcher/Dispatcher");

var _tracks = [];
var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ADD_TRACK":
      addTrack(payload.track);
      break;
    case "DELETE_TRACK":
      deleteTrack(payload.track);
      break;
  };
};

TrackStore.all = function() {
  return _tracks.slice();
};

var addTrack = function(track) {
  if (_tracks.indexOf(track) === -1) {
    _tracks.push(track);
    TrackStore.__emitChange();
  }
};

var deleteTrack = function(track) {
  var idx = _tracks.indexOf(track);
  if (idx !== -1) {
    _tracks.splice(idx, 1);
    TrackStore.__emitChange();
  }
};

module.exports = TrackStore;
