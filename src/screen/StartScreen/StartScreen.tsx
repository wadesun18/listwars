import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
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
  height: 30%;
`;

const StartScreen = ({navigation}) => {
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const handleJoin = () => {
    // Logic to join the list using the code
    console.log('Join list with code:', code);
    if (!name) {
      alert('Please enter a name');
      return;
    }
    navigation.navigate('Create');
  };

  return (
    <TopView>
      <SubView>
        <ButtonText>Your Name</ButtonText>
        <TextInput
          placeholder="codename"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#000"
        />
      </SubView>
      <SubView>
        <ButtonText>Join a List</ButtonText>
        <TextInput
          placeholder="Enter list code"
          value={code}
          onChangeText={setCode}
          placeholderTextColor="#000"
        />
      </SubView>
      <Button onPress={handleJoin}>
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          style={{color: LIST_COLOR}}
          size={50}
        />
      </Button>
    </TopView>
  );
};

export default StartScreen;
