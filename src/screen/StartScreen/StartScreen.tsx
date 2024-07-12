import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {LIST_COLOR} from '../../constants';

const TopView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 30px;
  background-color: #000;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const ButtonText = styled.Text`
  font-family: 'Montserrat_Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
  font-weight: 800;
  color: ${LIST_COLOR};
`;

const TextInput = styled.TextInput`
  font-family: 'Montserrat-Regular';
  borderwidth: 1;
  background-color: #fff;
  height: 40px;
  width: 50%;
  margin-right: 20px;
`;

const SubView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const StartScreen = ({navigation}) => {
  const [code, setCode] = React.useState('');
  const handleJoin = () => {
    // Logic to join the list using the code
    console.log('Join list with code:', code);
  };

  return (
    <TopView>
      <Button onPress={() => navigation.navigate('Create')}>
        <ButtonText>Create a New List</ButtonText>
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          style={{color: LIST_COLOR}}
          size={32}
        />
      </Button>

      <ButtonText>Join an Existing List</ButtonText>
      <SubView>
        <TextInput
          placeholder="Enter list code"
          value={code}
          onChangeText={setCode}
          placeholderTextColor="#000"
        />
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          style={{color: LIST_COLOR}}
          size={32}
        />
      </SubView>
    </TopView>
  );
};

export default StartScreen;
