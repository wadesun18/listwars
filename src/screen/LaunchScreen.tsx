import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
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
  font-family: Montserrat-SemiBold;
  font-size: 16px;
`;

const ButtonSecondaryText = styled.Text`
  color: #03a5fc;
  font-family: Montserrat-SemiBold;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 17px;
  text-align: center;
  margin: 30px;
  margin-bottom: 0px;
`;

const Title = styled.Text`
  color: #bf4f74;
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin: 5px;
`;

function LaunchScreen() {
  return (
    <SafeAreaView>
      <Onboarding
        containerStyles={{
          borderColor: 'black',
          borderWidth: 1,
          paddingBottom: 150,
        }}
        bottomBarHighlight={false}
        showDone={false}
        showSkip={false}
        showNext={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../images/List.png')}
                style={{
                  transform: [{scale: 1.4}],
                }}
              />
            ),
            title: <Title>Create a List</Title>,
            subtitle: (
              <SubTitle>
                Create a list of your choice: Todo list, shopping list or house
                chores list
              </SubTitle>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../images/Add_User.png')}
                style={{
                  transform: [{scale: 1.2}],
                }}
              />
            ),
            title: <Title>Invite Your Friends</Title>,
            subtitle: (
              <SubTitle>
                Give access to your friends so they can either view your list or
                edit it
              </SubTitle>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../images/Winner_Podium.png')}
                style={{
                  transform: [{scale: 1.5}],
                }}
              />
            ),
            title: <Title>Play to Win</Title>,
            subtitle: (
              <SubTitle>
                Mark off tasks to get points, have the most points at the end to
                win!
              </SubTitle>
            ),
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
