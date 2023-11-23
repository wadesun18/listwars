import styled from 'styled-components/native';

import {Task} from '../../types/data';

const RowText = styled.Text`
  color: blue;
  font-family: Montserrat-Regular;
  font-size: 14px;
  margin-bottom: 2px;
`;

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function ListItem({item}: {item: Task}) {
  const fields = ['item', 'details', 'whodunnit', 'status'];

  return (
    <RowView>
      {fields.map((field: string) => {
        return <RowText>{item[field as keyof Task]}</RowText>;
      })}
    </RowView>
  );
}
