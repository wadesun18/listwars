import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

function LaunchScreen() {
  return (
    <Onboarding
      onDone={() => console.log('done')}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../images/LW_Logo.jpeg')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('../images/LW_Logo.jpeg')} />,
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../images/LW_Logo.jpeg')} />,
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
}

export default LaunchScreen;
