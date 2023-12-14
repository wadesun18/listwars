import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native';

import {LIST_COLOR} from '../../constants';

// import {useListContext} from '../../context/ListContext';

const CreateView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

const CreateHeader = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ItemText = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 2px;
  color: ${LIST_COLOR};
`;

const CreateScreen = ({navigation}: NativeStackHeaderProps) => {
  // const {} = useListContext();

  const [text, onChangeText] = React.useState('Useless Text');

  return (
    <CreateView>
      <ScrollView>
        <CreateHeader>Create New List</CreateHeader>
        <ItemView>
          <ItemText>List Title</ItemText>
        </ItemView>
        <ItemView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </ItemView>
        <ItemView>
          <ItemText>Task</ItemText>
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
      </ScrollView>
    </CreateView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default CreateScreen;
