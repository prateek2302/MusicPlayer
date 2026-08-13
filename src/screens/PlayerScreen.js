import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import TrackPlayer, { useTrackPlayerEvents, Event, State, usePlaybackState } from 'react-native-track-player';
import MusicControls from '../components/MusicControls';
import ProgressBar from '../components/ProgressBar';
import TrackList from '../components/TrackList';
import { tracks } from '../services/tracks';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const playbackState = usePlaybackState();

  useEffect(() => {
    async function init() {
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
      const track = await TrackPlayer.getTrack(0);
      setCurrentTrack(track);
    }
    init();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentTrack(track);
    }
  });

  const isPlaying = playbackState.state === State.Playing;

  return (
    <View style={styles.container}>
      {/* Artwork Card */}
      <View style={styles.artworkWrapper}>
        <View style={styles.artworkShadow} />
        <Image
          source={{ uri: currentTrack?.artwork }}
          style={styles.artwork}
        />
        {/* Glass overlay */}
        <View style={styles.glass} />
      </View>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack?.title || '—'}</Text>
        <Text style={styles.artist}>{currentTrack?.artist || 'Select a track'}</Text>
      </View>

      <ProgressBar />
      <MusicControls isPlaying={isPlaying} />
      <TrackList onSelect={(idx) => TrackPlayer.skip(idx)} activeId={currentTrack?.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', paddingHorizontal: 20, paddingTop: 24 },
  artworkWrapper: { alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  artworkShadow: {
    position: 'absolute',
    width: width - 72,
    height: width - 72,
    backgroundColor: '#7c3aed',
    borderRadius: 32,
    opacity: 0.25,
    transform: [{ scale: 0.92 }, { translateY: 20 }],
    shadowColor: '#7c3aed',
    shadowRadius: 40,
    shadowOpacity: 0.6,
  },
  artwork: { width: width - 64, height: width - 64, borderRadius: 28 },
  glass: {
    position: 'absolute',
    bottom: -10,
    width: width - 120,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  meta: { marginTop: 36, alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  artist: { color: '#9ca3af', fontSize: 15, marginTop: 6, letterSpacing: 0.2 },
});
