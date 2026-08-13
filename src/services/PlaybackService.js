import TrackPlayer, { Event } from 'react-native-track-player';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => TrackPlayer.seekTo(position));

  // Auto-play next handled by TrackPlayer queue by default
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (data) => {
    if (data.position > 0) {
      // Restart queue or handle end
      // await TrackPlayer.seekTo(0);
    }
  });
}
