var React = require("react");
var Track = require("../util/Track");
var KeyStore = require("../stores/KeyStore");
var TrackStore = require("../stores/TrackStore");
var TrackActions = require('../actions/TrackActions');

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

  resetState: function() {
    this.setState({
      isRecording: false,
      track: new Track({}),
      trackName: ""
    });
  },

  handleRecord: function (e) {
    e.preventDefault();

    if (this.state.isRecording) {
      this.state.track.stopRecording();
    } else {
      this.state.track.startRecording();
    }

    this.setState({ isRecording: !this.state.isRecording });
  },

  handlePlay: function (e) {
    e.preventDefault();

    this.state.track.play();
  },

  handleSave: function(e) {
    e.preventDefault();

    this.state.track.name = this.state.trackName.trim();
    TrackActions.addTrack(this.state.track);

    this.resetState();
  },

  handleNameChange: function(e) {
    this.setState({trackName: e.target.value});
  },

  render: function () {
    var recordCls = (this.state.isRecording ? " recording" : "");
    var recordText = (this.state.isRecording ? "Stop" : "Start");

    var playText = "Play"

    return (
      <div className="buttons">
        <button className={"record" + recordCls}
                onClick={this.handleRecord}>{recordText}</button>

        <button className="play"
                onClick={this.handlePlay}>{playText}</button>

        <form onSubmit={this.handleSave}>
          <input onChange={this.handleNameChange}
            className="track-name"
            type="text" value={this.state.trackName}/>

          <input type="submit"
            className="save" value="Save Me!" />
        </form>
      </div>
    );
  }
});

module.exports = Recorder;
