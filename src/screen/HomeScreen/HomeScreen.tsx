import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, ScrollView, Vibration} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Shimmer from 'react-native-shimmer';
import styled from 'styled-components/native';

import ListItem from '../../component/ListItem';
import {success, successPlayPause} from '../../component/Sound';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';

const ListName = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const SuccessText = styled.Text`
  color: white;
  text-align: center;
`;

const SuccessView = styled.View`
  background-color: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TopView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

export default function HomeScreen({navigation}: any) {
  const [listSuccess, setListSuccess] = useState(false);
  const [renderTrophy, setRenderTrophy] = useState(false);

  const {listItems, getListItems, checkListCleared, listCleared} =
    useListContext();

  const listAnimatedValue = useRef(new Animated.Value(0)).current;

  const moveList = () => {
    Animated.timing(listAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setListSuccess(true);
      successPlayPause();
      setRenderTrophy(true);
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

  const trophyAnimatedValue = useRef(new Animated.Value(0.7)).current;

  const animateTrophy = () => {
    Animated.spring(trophyAnimatedValue, {
      toValue: 1.2,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };

  const trophyAnimStyle = {
    transform: [
      {
        scale: trophyAnimatedValue,
      },
    ],
  };

  success.setVolume(1);

  useEffect(() => {
    getListItems();
    checkListCleared(listItems);

    if (listCleared) {
      moveList();
    }
    if (renderTrophy) {
      animateTrophy();
      Vibration.vibrate();
    }
    // add listener to detect if user has navigated to IndexScreen
    const listener = navigation.addListener('focus', () => {
      getListItems();

      // cleanup function to remove listener
      return () => {
        listener.remove();
      };
    });
  }, [navigation, getListItems, listItems, checkListCleared, renderTrophy]);

  return (
    <>
      {listItems && !listSuccess && (
        <TopView>
          <ScrollView>
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
          </ScrollView>
        </TopView>
      )}
      {listSuccess && (
        <>
          <SuccessView>
            <Animated.Image
              style={[trophyAnimStyle]}
              source={require('../../images/Trophy.png')}
            />
            <Shimmer>
              <SuccessText>Success!</SuccessText>
            </Shimmer>
          </SuccessView>
          <ConfettiCannon
            count={200}
            origin={{x: -10, y: -600}}
            fadeOut={true}
          />
        </>
      )}
    </>
  );
}
