import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';

export default function MusicControls({ isPlaying }) {
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // off | track | queue

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => setShuffle(!shuffle)} style={styles.smallBtn}>
        <Icon name="shuffle" size={20} color={shuffle ? '#a78bfa' : '#6b7280'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()} style={styles.btn}>
        <Icon name="skip-previous" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => (isPlaying ? TrackPlayer.pause() : TrackPlayer.play())}
        style={styles.playBtn}
      >
        <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={36} color="#0a0a0f" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => TrackPlayer.skipToNext()} style={styles.btn}>
        <Icon name="skip-next" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setRepeat(repeat === 'off' ? 'queue' : repeat === 'queue' ? 'track' : 'off')}
        style={styles.smallBtn}
      >
        <Icon
          name={repeat === 'track' ? 'repeat-one' : 'repeat'}
          size={20}
          color={repeat !== 'off' ? '#a78bfa' : '#6b7280'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingHorizontal: 8,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});
