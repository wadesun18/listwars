import React from 'react';
import styled from 'styled-components/native';

import UserInput from './UserInput';
import {LIST_COLOR} from '../constants';

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
  // need to have a default new list retrieved from user context
  // below component should be a flatlist that renders each task

  // then need to call a function from context to add a new task
  // when user clicks the add button

  // user inputs data, and on submit call function from user context
  // to store the data so it can render the list

  return (
    <>
      <ItemView>
        <ItemText>Task Name</ItemText>
      </ItemView>
      <ItemView>
        <UserInput />
      </ItemView>
      <ItemView>
        <ItemText>Task Description</ItemText>
      </ItemView>
      <ItemView>
        <UserInput />
      </ItemView>
      <ItemView>
        <ItemText>Assignee</ItemText>
      </ItemView>
      <ItemView>
        <UserInput />
      </ItemView>
    </>
  );
}
