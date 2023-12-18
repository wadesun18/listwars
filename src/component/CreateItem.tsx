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
  height: 42px;
  justify-content: space-between;
  align-items: center;
`;

export default function CreateItem({index}: {index: number}) {
  return (
    <>
      <ItemView
        style={{backgroundColor: '#303030', marginTop: 50, marginBottom: 30}}>
        <ItemText style={{fontSize: 20}}>Task #{index + 1}</ItemText>
      </ItemView>
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
