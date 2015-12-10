var KeyStore = require('../stores/key_store');
var React = require('react');
var Note = require('../util/note');
var TONES = require('../constants/tones');

var Key = React.createClass({
  getInitialState: function () {
    return { pressed: false };
  },

  componentDidMount: function () {
    this.note = new Note(TONES[this.props.noteName]);
    this.listenerToken = KeyStore.addListener(this.play);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  play: function () {
    if (KeyStore.includes(this.props.noteName)) {
      this.note.start();
      this.setState({ pressed: true });
    } else {
      this.note.stop();
      this.setState({ pressed: false });
    }
  },

  render: function () {
    var cls = (this.state.pressed ? " pressed" : "");

    return <li className={ "key" + cls }>{ this.props.noteName }</li>;
  }
});

module.exports = Key;
