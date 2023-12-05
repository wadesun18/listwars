import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const pencil = new Sound('pencil.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log(
    'duration in seconds: ' +
      pencil.getDuration() +
      'number of channels: ' +
      pencil.getNumberOfChannels(),
  );
});

export const playPause = () => {
  pencil.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};
