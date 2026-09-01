/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-track-player', () => ({
  __esModule: true,
  default: {
    setupPlayer: jest.fn(() => Promise.resolve()),
    updateOptions: jest.fn(() => Promise.resolve()),
    reset: jest.fn(() => Promise.resolve()),
    add: jest.fn(() => Promise.resolve()),
    getTrack: jest.fn(() => Promise.resolve({})),
    addEventListener: jest.fn(),
    play: jest.fn(() => Promise.resolve()),
    pause: jest.fn(() => Promise.resolve()),
    skipToNext: jest.fn(() => Promise.resolve()),
    skipToPrevious: jest.fn(() => Promise.resolve()),
    seekTo: jest.fn(() => Promise.resolve()),
    skip: jest.fn(),
  },
  Capability: {
    Play: 'play',
    Pause: 'pause',
    SkipToNext: 'skip-to-next',
    SkipToPrevious: 'skip-to-previous',
    SeekTo: 'seek-to',
  },
  Event: {
    PlaybackTrackChanged: 'playback-track-changed',
  },
  State: {
    Playing: 'playing',
  },
  usePlaybackState: jest.fn(() => ({ state: 'paused' })),
  useProgress: jest.fn(() => ({ position: 0, duration: 0 })),
  useTrackPlayerEvents: jest.fn(),
}));

jest.mock('@react-native-vector-icons/material-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
