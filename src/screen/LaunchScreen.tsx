import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {Image} from 'react-native';
// import Onboarding from 'react-native-onboarding-swiper';

function LaunchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.montserratBold}>This text uses Montserrat bold</Text>
      <Text style={styles.montserratRegular}>
        This text uses Montserrat Regular
      </Text>
      <Text style={styles.montserratBoldItalic}>
        This is Montserrat Bold Italic
      </Text>
      <Text style={styles.montserratSemiBold}>
        This is Montserrat Semi Bold
      </Text>
      <Text style={styles.montserratSemiBoldItalic}>
        This is Montserrat Semi Bold
      </Text>
    </View>
    // <Onboarding
    //   onDone={() => console.log('done')}
    //   bottomBarHighlight={false}
    //   pages={[
    //     {
    //       backgroundColor: '#fff',
    //       image: <Image source={require('../images/LW_Logo1024x1024.jpg')} />,
    //       title: 'Onboarding',
    //       subtitle: 'Done with React Native Onboarding Swiper',
    //     },
    //     {
    //       backgroundColor: '#fe6e58',
    //       image: <Image source={require('../images/LW_Logo1024x1024.jpg')} />,
    //       title: 'The Title',
    //       subtitle: 'This is the subtitle that sumplements the title.',
    //     },
    //     {
    //       backgroundColor: '#999',
    //       image: <Image source={require('../images/LW_Logo1024x1024.jpg')} />,
    //       title: 'Triangle',
    //       subtitle: "Beautiful, isn't it?",
    //     },
    //   ]}
    // />
  );
}

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  montserratRegular: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  montserratBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  montserratBoldItalic: {
    fontFamily: 'Montserrat-BoldItalic',
    fontSize: 20,
  },
  montserratSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  montserratSemiBoldItalic: {
    fontFamily: 'Montserrat-SemiBoldItalic',
    fontSize: 20,
  },
});
