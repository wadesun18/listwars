import {useEffect} from 'react';
import {Alert, FlatList, ScrollView} from 'react-native';
import styled from 'styled-components/native';

import ListItem from '../../component/ListItem';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';
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

export default function HomeScreen({navigation}: any) {
  const {listItems, getListItems, setListItems} = useListContext();

  useEffect(() => {
    getListItems();
    // add listener to detect if user has navigated to IndexScreen
    const listener = navigation.addListener('focus', () => {
      getListItems();

      // cleanup function to remove listener
      return () => {
        listener.remove();
      };
    });
  }, [navigation, getListItems]);

  return (
    <TopView>
      <ScrollView>
        {listItems && <ListName>{listItems.listName}</ListName>}
        {listItems && (
          <FlatList
            data={listItems.tasks}
            renderItem={({item}) => <ListItem item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </ScrollView>
    </TopView>
  );
}
