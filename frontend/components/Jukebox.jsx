var React = require('react');
var TrackStore = require('../stores/track_store');
var TrackPlayer = require('./track_player');

var Jukebox = React.createClass({
  getInitialState: function () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount: function () {
    this.token = TrackStore.addListener(this._tracksChanged);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  _tracksChanged: function () {
    this.setState({ tracks: TrackStore.all() });
  },

  render: function () {
    var tracks = this.state.tracks;
    var trackPlayers = tracks.map(function(track, idx) {
      return <TrackPlayer track={ track } key={ idx } />;
    });

    return (
      <div className="jukebox">
        <h2>Jukebox</h2>

        { trackPlayers }
      </div>
    );
  }
});

module.exports = Jukebox;
