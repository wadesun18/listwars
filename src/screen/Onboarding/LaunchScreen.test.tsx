import {render} from '@testing-library/react-native';

import LaunchScreen from './LaunchScreen';

jest.mock(
  'react-native-onboarding-swiper',
  () => 'react-native-onboarding-swiper',
);

test('examples of some things', async () => {
  const {getByText} = render(<LaunchScreen />);

  expect(getByText('Create an account')).toBeTruthy();
  expect(getByText('Sign In')).toBeTruthy();
});
