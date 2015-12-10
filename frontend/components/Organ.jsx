var React = require('react');
var Key = require('./Key');
var Recorder = require("./Recorder");
var TONES = require('../constants/Tones');

var Organ = React.createClass({
  render: function() {
    var keys = Object.keys(TONES).map(function(key, idx){
      return <Key noteName={key} key={idx} />
    });

    return (
      <div className="organ">
        <ul className="keys">{keys}</ul>
        <Recorder />
      </div>
    );
  }
});

module.exports = Organ;
