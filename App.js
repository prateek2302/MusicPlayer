import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Platform, PermissionsAndroid, View, Text } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import PlayerScreen from './src/screens/PlayerScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [setupError, setSetupError] = useState(null);

  useEffect(() => {
    async function setup() {
      try {
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

        if (Platform.OS === 'android' && Platform.Version >= 33) {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          ).catch(() => {});
        }
      } catch (error) {
        setSetupError(error instanceof Error ? error.message : String(error));
      }
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
        <Text style={{ color: '#fff', fontSize: 16, letterSpacing: 1 }}>
          {setupError || 'INITIALIZING PLAYER...'}
        </Text>
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
