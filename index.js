import { AppRegistry } from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/services/PlaybackService';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Register background playback service
TrackPlayer.registerPlaybackService(() => PlaybackService);
