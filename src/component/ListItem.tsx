import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import React from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
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

  const ref = React.useRef(View.prototype);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const [textWidth, setTextWidth] = React.useState(0);
  const [textHeight, setTextHeight] = React.useState(0);

  React.useEffect(() => {
    ref.current.measure((x, y, w, h) => {
      setTextWidth(w);
      setTextHeight(h);
      animateStrike();
    });
  }, [listItem.status]);

  const animateStrike = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const strikeWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, textWidth],
    extrapolate: 'clamp',
  });

  const clickComplete = () => {
    const tempItem = {id, title, details, status, whodunnit};
    const modifyComplete =
      status === 'incomplete' ? (status = 'complete') : (status = 'incomplete');
    tempItem.status = modifyComplete;
    setListItem(tempItem);
    console.log(listItem);
  };

  return (
    <>
      <RowView>
        <TaskContainer>
          <View ref={ref}>
            <ListTitle status={listItem.status}>{title}</ListTitle>
            <Animated.View
              style={[
                styles.strike,
                {width: strikeWidth, top: textHeight / 2 + 1},
              ]}
            />
            {listItem.status === 'incomplete' && (
              <ListDetails status={listItem.status}>{details}</ListDetails>
            )}
          </View>
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
          <DoneByText>{whodunnit}</DoneByText>
        )}
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
    height: 2,
    backgroundColor: 'red',
  },
});
