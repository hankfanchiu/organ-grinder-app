var React = require('react');
var Key = require('./Key');
var TONES = require('../constants/Tones');

var Organ = React.createClass({
  render: function() {
    var keys = Object.keys(TONES).map(function(key, idx){
      return <Key noteName={key} key={idx} />
    });

    return (
      <ul className="organ">{keys}</ul>
    );
  }
});

module.exports = Organ;
