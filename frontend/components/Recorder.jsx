var React = require("react");
var Track = require("../util/Track");
var KeyStore = require("../stores/KeyStore");

var Recorder = React.createClass({
  getInitialState: function () {
    return { isRecording: false, track: new Track({}) };
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

  render: function () {
    var recordCls = (this.state.isRecording ? " recording" : "");
    var recordText = (this.state.isRecording ? "Stop" : "Start");

    var playCls;
    var playText = "Play"

    return (
      <div className="buttons">
        <button className={"record" + recordCls}
                onClick={this.handleRecord}>{recordText}</button>
        <button className="play"
                onClick={this.handlePlay}>{playText}</button>
      </div>
    );
  }
});

module.exports = Recorder;
