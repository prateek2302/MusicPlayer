import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { tracks } from '../services/tracks';

export default function TrackList({ onSelect, activeId }) {
  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 28 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        const active = item.id === activeId;
        return (
          <TouchableOpacity
            onPress={() => onSelect(index)}
            style={[styles.row, active && styles.activeRow]}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.artwork }} style={styles.art} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, active && { color: '#fff' }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
            <View style={[styles.dot, active && { backgroundColor: '#a78bfa' }]} />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 10,
  },
  activeRow: {
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    borderColor: 'rgba(124, 58, 237, 0.25)',
  },
  art: { width: 44, height: 44, borderRadius: 10 },
  title: { color: '#d1d5db', fontSize: 14, fontWeight: '600' },
  artist: { color: '#6b7280', fontSize: 12, marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2a2a30' },
});
