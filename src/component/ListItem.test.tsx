import {render} from '@testing-library/react-native';

import ListItem from './ListItem';

const ListItemMockData = {
  id: '1',
  title: 'Clean floors',
  details: 'Vacuum then wash floors',
  whodunnit: 'Maria',
  status: 'complete',
};

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

jest.mock('react-native-sound', () => {
  class SoundMock {
    constructor(path, type, callback) {}
  }

  SoundMock.prototype.setVolume = jest.fn();
  SoundMock.prototype.setNumberOfLoops = jest.fn();
  SoundMock.prototype.play = jest.fn();
  SoundMock.prototype.stop = jest.fn();

  SoundMock.setCategory = jest.fn();

  return SoundMock;
});

jest.mock(
  'react-native-onboarding-swiper',
  () => 'react-native-onboarding-swiper',
);

test('mock list item', async () => {
  const {getByText} = render(<ListItem item={ListItemMockData} />);

  expect(getByText('Clean floors')).toBeTruthy();
  expect(getByText('Maria')).toBeTruthy();
});
