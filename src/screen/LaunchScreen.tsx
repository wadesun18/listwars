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
          image: <Image source={require('../images/LW_Logo_example.jpg')} />,
          title: 'Create a List',
          subtitle:
            'Create a list of your choice: todo list, shopping list or house chores list',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('../images/LW_Logo_example.jpg')} />,
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('../images/LW_Logo_example.jpg')} />,
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
}

export default LaunchScreen;
