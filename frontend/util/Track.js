var KeyActions = require("../actions/KeyActions");

var Track = function (attributes) {
  this.attributes = attributes;
  this.name = attributes.name || "";
  this.roll = attributes.roll || [];
};

Track.prototype.startRecording = function () {
  this.roll = [];
  this.time = Date.now();
};

Track.prototype.addNotes = function (object) {
  this.roll.push(object);
};

Track.prototype.stopRecording = function () {
  this.addNotes([]);
};

Track.prototype.play = function () {
  if (this.interval) { return; }

  var playBackStartTime = Date.now();
  var currentNote = 0;

  this.interval = setInterval(function() {
    if (currentNote < this.roll.length) {
      var currentTimeSlice = Date.now() - playBackStartTime;
      var currentRoll = this.roll[currentNote];

      if (currentTimeSlice > currentRoll.timeSlice) {
        KeyActions.playback(currentRoll.notes);
        currentNote += 1;
      }

    } else {
      clearInterval(this.interval);
      delete this.interval;
    }
  }.bind(this), 10);
};

module.exports = Track;
