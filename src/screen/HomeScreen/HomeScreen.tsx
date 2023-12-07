import React, {useEffect} from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';

import ListItem from '../../component/ListItem';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';

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
  const {listItems, getListItems, checkListCleared, listCleared} =
    useListContext();

  // introduce a function to check whether all list items are cleared

  useEffect(() => {
    getListItems();
    checkListCleared(listItems);
    // add listener to detect if user has navigated to IndexScreen
    const listener = navigation.addListener('focus', () => {
      getListItems();

      // cleanup function to remove listener
      return () => {
        listener.remove();
      };
    });
  }, [navigation, getListItems, listItems, checkListCleared]);

  return (
    <TopView>
      <ScrollView>
        {listCleared ? (
          <Text style={{color: 'white'}}>List cleared</Text>
        ) : (
          listItems && (
            <>
              <ListName>{listItems.listName}</ListName>

              <FlatList
                data={listItems.tasks}
                renderItem={({item}) => (
                  <ListItem item={item} checkListCleared={checkListCleared} />
                )}
                keyExtractor={item => item.id}
              />
            </>
          )
        )}
      </ScrollView>
    </TopView>
  );
}
