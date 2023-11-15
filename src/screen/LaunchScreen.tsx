import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

function LaunchScreen() {
  return (
    <Onboarding
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          bottomBarHighlight: false,
          bottomBarColor: '#fffff',
          bottomBarHeight: 10,
        },
        {
          backgroundColor: '#a6e4d0',
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          bottomBarHighlight: false,
          bottomBarColor: '#fffff',
        },
        {
          backgroundColor: '#a6e4d0',
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          bottomBarHighlight: false,
        },
      ]}
    />
  );
}

export default LaunchScreen;
