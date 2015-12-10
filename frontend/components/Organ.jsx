var React = require('react');
var Key = require('./key');
var Recorder = require("./recorder");
var TONES = require('../constants/tones');
var Jukebox = require("./jukebox");

var Organ = React.createClass({
  keys: function () {
    return Object.keys(TONES).map(function(key, idx){
      return <Key noteName={ key } key={ idx } />;
    });
  },

  render: function () {
    return (
      <div className="organ">

        <ul className="keys">
          { keys }
        </ul>

        <Recorder />

        <Jukebox />

      </div>
    );
  }
});

module.exports = Organ;
