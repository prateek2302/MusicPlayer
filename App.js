import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Platform, PermissionsAndroid, View, Text } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import PlayerScreen from './src/screens/PlayerScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setup() {
      // Request notification permission for Android 13+
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }

      await TrackPlayer.setupPlayer({
        autoHandleInterruptions: true,
      });

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 1,
      });

      setIsReady(true);
    }

    setup();

    return () => {
      // Cleanup on unmount
      TrackPlayer.reset();
    };
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0f', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16, letterSpacing: 1 }}>INITIALIZING PLAYER...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0f' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <PlayerScreen />
    </SafeAreaView>
  );
}
