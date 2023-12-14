import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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

const CreateSubheader = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #000;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
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
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
  color: ${LIST_COLOR};
`;

const CreateScreen = ({navigation}: NativeStackHeaderProps) => {
  // const {} = useListContext();

  const [title, onChangeTitle] = React.useState('Example title text');
  const [text, onChangeText] = React.useState('Example text');

  return (
    <CreateView>
      <ScrollView>
        <CreateHeader>Create New List</CreateHeader>
        <ItemView>
          <CreateSubheader>List Title</CreateSubheader>
        </ItemView>
        <ItemView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
          />
        </ItemView>
        <ItemView style={{marginTop: 40}}>
          <CreateSubheader>Tasks</CreateSubheader>
        </ItemView>
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
          <FontAwesomeIcon
            icon={faPlus}
            style={{color: LIST_COLOR}}
            size={26}
          />
        </AddButton>
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
