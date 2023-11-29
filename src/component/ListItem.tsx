import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components/native';

import {Task} from '../../types/data';
import {COMPLETE_COLOR, LIST_COLOR} from '../constants';

const ListTitle = styled.Text<{status: string}>`
  font-family: Montserrat-Regular;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 2px;
  text-decoration-line: ${props =>
    props.status === 'complete' && 'line-through'};
  color: ${props =>
    props.status === 'complete' ? COMPLETE_COLOR : LIST_COLOR};
`;

ListTitle.defaultProps = {
  status: 'incomplete',
};

const ListDetails = styled.Text<{status: string}>`
  color: blue;
  font-family: Montserrat-Regular;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2px;
  color: #fff;
  text-decoration-line: ${props =>
    props.status === 'complete' && 'line-through'};
`;

ListDetails.defaultProps = {
  status: 'incomplete',
};

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const TaskContainer = styled.View`
  flex: 1;
`;

const DoneButton = styled.TouchableOpacity`
  background-color: #000;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const DoneByText = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 14px;
  font-weight: 400;
  color: ${LIST_COLOR};
`;

// const Wrapper = styled.View`
//   color: ${props => props.theme.color.primary};
// `;

// Wrapper.defaultProps = {
//   theme: {
//     color: {
//       primary: 'yellow',
//     },
//   },
// };

export default function ListItem({
  item: {title, details, status, whodunnit},
}: {
  item: Task;
}) {
  return (
    <RowView>
      <TaskContainer>
        <ListTitle status={status}>{title}</ListTitle>
        {status === 'incomplete' && (
          <ListDetails status={status}>{details}</ListDetails>
        )}
      </TaskContainer>
      {status === 'incomplete' ? (
        <DoneButton>
          <FontAwesomeIcon
            icon={faCheck}
            style={{color: '#fca903'}}
            size={32}
          />
        </DoneButton>
      ) : (
        <DoneByText>{whodunnit}</DoneByText>
      )}
    </RowView>
  );
}
