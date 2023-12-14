import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native';

import {LIST_COLOR} from '../constants';

const AddButton = styled.TouchableOpacity`
  background-color: #000;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const ItemText = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
  color: ${LIST_COLOR};
`;

const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export default function CreateItem() {
  const [text, onChangeText] = React.useState('Example text');

  return (
    <>
      <ItemView>
        <ItemText>Task Name</ItemText>
      </ItemView>
      <ItemView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </ItemView>
      <ItemView>
        <ItemText>Task Description</ItemText>
      </ItemView>
      <ItemView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </ItemView>
      <ItemView>
        <ItemText>Assignee</ItemText>
      </ItemView>
      <ItemView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </ItemView>
      <AddButton>
        <FontAwesomeIcon icon={faPlus} style={{color: LIST_COLOR}} size={26} />
      </AddButton>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
