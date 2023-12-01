import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import React from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
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
  height: 50px;
  width: 50px;
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

  const [titleTextWidth, setTitleTextWidth] = React.useState(0);
  const [titleTextHeight, setTitleTextHeight] = React.useState(0);
  const [detailsTextWidth, setDetailsTextWidth] = React.useState(0);
  const [detailsTextHeight, setDetailsTextHeight] = React.useState(0);

  const animateStrike = () => {
    Animated.timing(animatedValue, {
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
    });
  };

  const animateStrikeDetail = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
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

  return (
    <>
      <RowView>
        <TaskContainer>
          <ListTitle ref={titleRef} status={listItem.status}>
            {title}
          </ListTitle>
          <Animated.View
            style={[
              styles.strike,
              {width: titleStrikeWidth, top: titleTextHeight / 2 + 1},
            ]}
          />
        </TaskContainer>
        {listItem.status === 'incomplete' ? (
          <DoneButton onPress={clickComplete}>
            <FontAwesomeIcon
              icon={faCheck}
              style={{color: '#fca903'}}
              size={32}
            />
          </DoneButton>
        ) : (
          <View>
            <DoneByText>{whodunnit}</DoneByText>
          </View>
        )}
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

// Using React Animation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  strike: {
    position: 'absolute',
    height: 3,
    backgroundColor: COMPLETE_COLOR,
  },
});
