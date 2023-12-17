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

export default function CreateItem({index}: {index: number}) {
  // need to pass in the index value and put the task number in the header

  console.log('indexlala', index);

  return (
    <>
      <ItemView>
        <ItemText>Task #{index + 1}</ItemText>
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
