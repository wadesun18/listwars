import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, ScrollView, Text} from 'react-native';
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
  const [listSuccess, setListSuccess] = useState(false);

  const {listItems, getListItems, checkListCleared, listCleared} =
    useListContext();

  // introduce a function to check whether all list items are cleared

  // animate list clear when all items marked complete

  const listAnimatedValue = useRef(new Animated.Value(0)).current;

  const moveList = () => {
    Animated.timing(listAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setListSuccess(true);
    });
  };

  const yVal = listAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  useEffect(() => {
    getListItems();
    checkListCleared(listItems);
    if (listCleared) {
      moveList();
    }
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
        {listItems && !listSuccess && (
          <Animated.View style={[animStyle]}>
            <ListName>{listItems?.listName}</ListName>

            <FlatList
              data={listItems?.tasks}
              renderItem={({item}) => (
                <ListItem item={item} checkListCleared={checkListCleared} />
              )}
              keyExtractor={item => item.id}
            />
          </Animated.View>
        )}
        {listSuccess && <Text style={{color: 'white'}}>Success!</Text>}
      </ScrollView>
    </TopView>
  );
}
