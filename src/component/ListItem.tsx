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

const FIELDS = ['item', 'details', 'whodunnit', 'status'];
export default function ListItem({item}: {item: Task}) {
  return (
    <RowView>
      {FIELDS.map((field: string) => {
        return <RowText>{item[field as keyof Task]}</RowText>;
      })}
    </RowView>
  );
}
