var Store = require('flux/utils').Store;
var AppDispatcher = require("../dispatcher/Dispatcher");

var _keys = [];
var KeyStore = new Store(AppDispatcher);

KeyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "REMOVE_KEY":
      removeKey(payload.noteName);
      break;
    case "ADD_KEY":
      addKey(payload.noteName);
      break;
    case "SET_KEYS":
      setKeys(payload.keys);
      break;
  };
};

KeyStore.includes = function (noteName) {
  return _keys.indexOf(noteName) !== -1;
};

KeyStore.all = function () {
  return _keys.slice();
};

var removeKey = function (noteName) {
  var idx = _keys.indexOf(noteName);
  _keys.splice(idx, 1);

  KeyStore.__emitChange();
};

var addKey = function (noteName) {
  if (!KeyStore.includes(noteName)) {
    _keys.push(noteName);
    KeyStore.__emitChange();
  }
};

var setKeys = function (keys) {
  _keys = keys;
  KeyStore.__emitChange();
};

module.exports = KeyStore;
