import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { formatTime } from '../utils/formatters';

export default function ProgressBar() {
  const { position, duration } = useProgress(250); // 250ms update

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration || 1}
        minimumTrackTintColor="#a78bfa"
        maximumTrackTintColor="rgba(255,255,255,0.12)"
        thumbTintColor="#fff"
        onSlidingComplete={(val) => TrackPlayer.seekTo(val)}
      />
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  slider: { width: '100%', height: 32 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -4, paddingHorizontal: 4 },
  time: { color: '#6b7280', fontSize: 11, fontVariant: ['tabular-nums'], letterSpacing: 0.5 },
});
