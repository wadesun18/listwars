import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import ListItem from '../../component/ListItem';
import {Data} from '../../data/MockData';

const HeaderText = styled.Text`
  color: blue;
  font-family: Montserrat-SemiBold;
  font-size: 16px;
  margin-bottom: 2px;
`;

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ListName = styled.Text`
  color: purple;
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const TopView = styled.View`
  margin-top: 100px;
`;

const HEADERS = ['Task', 'Details', 'Whodunnit?', 'Status'];
export default function HomeScreen() {
  return (
    <TopView>
      <ListName>{Data.listName}</ListName>
      <HeaderView>
        {HEADERS.map((header: string) => {
          return <HeaderText>{header}</HeaderText>;
        })}
      </HeaderView>
      <FlatList
        data={Data.tasks}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={item => item.id}
      />
    </TopView>
  );
}
