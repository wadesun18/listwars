import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
const StyledText = styled.Text`
  color: #bf4f74;
`;

const Button = styled.TouchableOpacity<{isSecondary?: boolean}>`
  background-color: ${props => (props.isSecondary ? '#fff' : '#03a5fc')};
  height: 50px;
  width: 80%;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const ButtonPrimaryText = styled.Text`
  color: #fff;
`;

const ButtonSecondaryText = styled.Text`
  color: #03a5fc;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

function LaunchScreen() {
  return (
    <SafeAreaView>
      <Onboarding
        containerStyles={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        bottomBarHighlight={false}
        showDone={false}
        showSkip={false}
        showNext={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../images/LW_Logo_example.jpg')} />,
            title: <StyledText>OnBoarding</StyledText>,
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../images/LW_Logo_example.jpg')} />,
            title: 'The Title',
            subtitle: 'This is the subtitle that sumplements the title.',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../images/LW_Logo_example.jpg')} />,
            title: 'Triangle',
            subtitle: "Beautiful, isn't it?",
          },
        ]}
      />
      <ButtonContainer>
        <Button isSecondary={false}>
          <ButtonPrimaryText>Create an account</ButtonPrimaryText>
        </Button>
        <Button isSecondary>
          <ButtonSecondaryText>Sign In</ButtonSecondaryText>
        </Button>
      </ButtonContainer>
    </SafeAreaView>
  );
}

export default LaunchScreen;
