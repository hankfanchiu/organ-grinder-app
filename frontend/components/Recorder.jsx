var React = require("react");
var Track = require("../util/track");
var KeyStore = require("../stores/key_store");
var TrackStore = require("../stores/track_store");
var TrackActions = require('../actions/track_actions');

var Recorder = React.createClass({
  getInitialState: function () {
    return {
      isRecording: false,
      track: new Track({}),
      trackName: ""
     };
  },

  componentDidMount: function () {
    this.listenerToken = KeyStore.addListener(this.keysChanged);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  timeSlice: function () {
    return Date.now() - this.state.track.time;
  },

  keysChanged: function () {
    if (this.state.isRecording) {
      var object = {
        timeSlice: this.timeSlice(),
        notes: KeyStore.all()
      };

      this.state.track.addNotes(object);
    }
  },

  resetState: function () {
    this.setState({
      isRecording: false,
      track: new Track({}),
      trackName: ""
    });
  },

  handleRecord: function (e) {
    if (this.state.isRecording) {
      this.state.track.stopRecording();
    } else {
      this.state.track.startRecording();
    }

    this.setState({ isRecording: !this.state.isRecording });
  },

  handlePlay: function (e) {
    this.state.track.play();
  },

  handleSave: function (e) {
    this.state.track.name = this.state.trackName.trim();
    TrackActions.addTrack(this.state.track);
    this.resetState();
  },

  handleNameChange: function (e) {
    this.setState({ trackName: e.target.value });
  },

  render: function () {
    var recordCls = (this.state.isRecording ? " recording" : "");
    var recordText = (this.state.isRecording ? "Stop" : "Start");

    return (
      <div className="buttons">

        <button className={ "record" + recordCls }
                onClick={ this.handleRecord }>{ recordText }</button>

        <button className="play"
                onClick={ this.handlePlay }>Play</button>

        <form onSubmit={ this.handleSave }>

          <input onChange={ this.handleNameChange }
            className="track-name"
            type="text" value={ this.state.trackName } />

          <input type="submit"
            className="save" value="Save Me!" />

        </form>
      </div>
    );
  }
});

module.exports = Recorder;
