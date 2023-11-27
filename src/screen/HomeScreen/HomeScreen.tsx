import {FlatList, ScrollView} from 'react-native';
import styled from 'styled-components/native';

import ListItem from '../../component/ListItem';
import {LIST_COLOR} from '../../constants';
import {Data} from '../../data/MockData';

const ListName = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const TopView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

export default function HomeScreen() {
  return (
    <TopView>
      <ScrollView>
        <ListName>{Data.listName}</ListName>
        <FlatList
          data={Data.tasks}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </TopView>
  );
}
