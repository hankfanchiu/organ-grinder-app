var React = require('react');
var TrackActions = require('../actions/TrackActions');

var TrackPlayer = React.createClass({
  handlePlay: function() {
    this.props.track.play();
  },

  handleDelete: function() {
    TrackActions.deleteTrack(this.props.track);
  },

  render: function(){
    return (
      <li className="track">
        {this.props.track.name}

        <button className="play-track"
          onClick={this.handlePlay}>Play</button>

        <button className="delete"
          onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
});

module.exports = TrackPlayer;
