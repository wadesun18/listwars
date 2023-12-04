import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import React from 'react';
import {Animated, Easing, StyleSheet, Vibration} from 'react-native';
import Sound from 'react-native-sound';
import styled from 'styled-components/native';

import {Task} from '../../types/data';
import {COMPLETE_COLOR, LIST_COLOR} from '../constants';

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

const ListTitle = styled.Text<{status: string}>`
  font-family: Montserrat-Regular;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 2px;
  color: ${props =>
    props.status === 'complete' ? COMPLETE_COLOR : LIST_COLOR};
`;

// const ListTitleComplete = styled.Text<{status: string}>`
//   font-family: Montserrat-Regular;
//   font-size: 24px;
//   font-weight: 800;
//   margin-bottom: 2px;
//   text-decoration: line-through;
//   color: ${props =>
//     props.status === 'complete' ? COMPLETE_COLOR : LIST_COLOR};
// `;

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
`;

ListDetails.defaultProps = {
  status: 'incomplete',
};

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const TaskContainer = styled.View`
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  justify-content: center;
  width: 50;
  height: 50;
`;

Sound.setCategory('Playback');

export default function ListItem({
  item: {id, title, details, status, whodunnit},
}: {
  item: Task;
}) {
  const [listItem, setListItem] = useState({
    id,
    title,
    details,
    status,
    whodunnit,
  });

  const titleRef = React.useRef(ListTitle.prototype);
  const detailsRef = React.useRef(ListDetails.prototype);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const pencil = new Sound('pencil.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log(
      'duration in seconds: ' +
        pencil.getDuration() +
        'number of channels: ' +
        pencil.getNumberOfChannels(),
    );
  });

  pencil.setVolume(1);

  const playPause = () => {
    pencil.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const [titleTextWidth, setTitleTextWidth] = React.useState(0);
  const [titleTextHeight, setTitleTextHeight] = React.useState(0);
  const [detailsTextWidth, setDetailsTextWidth] = React.useState(0);
  const [detailsTextHeight, setDetailsTextHeight] = React.useState(0);

  const animateStrike = async () => {
    await Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      const tempItem = {id, title, details, status, whodunnit};
      const modifyComplete =
        status === 'incomplete'
          ? (status = 'complete')
          : (status = 'incomplete');
      tempItem.status = modifyComplete;
      setListItem(tempItem);
      Vibration.vibrate();
    });
  };

  const animateStrikeDetail = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const titleStrikeWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, titleTextWidth],
    extrapolate: 'clamp',
  });

  const detailsStrikeWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, detailsTextWidth],
    extrapolate: 'clamp',
  });

  const clickComplete = () => {
    playPause();
    titleRef.current.measure((x, y, w, h) => {
      setTitleTextWidth(w);
      setTitleTextHeight(h);
      animateStrike();
    });
    detailsRef.current.measure((x, y, w, h) => {
      setDetailsTextWidth(w);
      setDetailsTextHeight(h);
      animateStrikeDetail();
    });
  };

  const {status: itemStatus} = listItem;
  return (
    <>
      <RowView>
        <TaskContainer>
          {/* {itemStatus === 'complete' ? (
            <ListTitleComplete ref={titleRef} status={itemStatus}>
              {title}
            </ListTitleComplete>
          ) : (
            <> */}
          <ListTitle ref={titleRef} status={itemStatus}>
            {title}
          </ListTitle>
          <Animated.View
            style={[
              styles.strike,
              {width: titleStrikeWidth, top: titleTextHeight / 2 + 1},
            ]}
          />
          {/* </>
          )} */}
        </TaskContainer>
        <LeftContainer>
          {itemStatus === 'incomplete' ? (
            <DoneButton onPress={clickComplete}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{color: '#fca903'}}
                size={32}
              />
            </DoneButton>
          ) : (
            <DoneByText>{whodunnit}</DoneByText>
          )}
        </LeftContainer>
      </RowView>
      <RowView>
        <ListDetails ref={detailsRef} status={listItem.status}>
          {details}
        </ListDetails>
        <Animated.View
          style={[
            styles.strike,
            {width: detailsStrikeWidth, top: detailsTextHeight / 2 + 1},
          ]}
        />
      </RowView>
    </>
  );
}

const styles = StyleSheet.create({
  strike: {
    position: 'absolute',
    height: 3,
    backgroundColor: COMPLETE_COLOR,
  },
});
