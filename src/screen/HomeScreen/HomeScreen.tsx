import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, ScrollView, Vibration } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Shimmer from 'react-native-shimmer';
import styled from 'styled-components/native';

import AnimatedView from '../../component/AnimatedView';
import ListItem from '../../component/ListItem';
import { success, successPlayPause } from '../../component/Sound';
import { LIST_COLOR } from '../../constants';
import { useListContext } from '../../context/ListContext';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const Button = styled.TouchableOpacity`
  background: white;
  border-radius: 10px;
  color: white;
  display: inline-block;
  margin-top: 30px;
  opacity: 0.8;
`;

const ButtonText = styled.Text`
  color: black;
  font-family: 'Montserrat_Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;

const ListName = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 800;
`;

const SuccessText = styled.Text`
  color: white;
  font-family: Montserrat-SemiBold;
  text-align: center;
  font-size: 24px;
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

export default function HomeScreen({ navigation }: any) {
  const bannerRef = useRef<BannerAd>(null);

  const [listSuccess, setListSuccess] = useState(false);
  const [renderTrophy, setRenderTrophy] = useState(false);

  const { listItems, getListItems, checkListCleared, listCleared, listWinner } =
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

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  })


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
    marginBottom: 20,
  };

  success.setVolume(1);

  const winnerMessage = listWinner(listItems);

  const onPress = () => {
    navigation.push('Create');
  };

  useEffect(() => {
    getListItems();
    checkListCleared(listItems);

    if (listCleared) {
      moveList();
      listWinner(listItems);
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
          <Animated.View style={[animStyle]}>
            <ListName>{listItems?.listName}</ListName>
            <ScrollView>
              <FlatList
                data={listItems?.tasks}
                renderItem={({ item }) => (
                  <ListItem item={item} checkListCleared={checkListCleared} />
                )}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          </Animated.View>
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
              <SuccessText>{winnerMessage}</SuccessText>
            </Shimmer>
            <AnimatedView>
              <Button onPress={onPress}>
                <ButtonText>Continue</ButtonText>
              </Button>
            </AnimatedView>
          </SuccessView>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: -600 }}
            fadeOut={true}
          />
        </>
      )}
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </>
  );
}
