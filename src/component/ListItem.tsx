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
  font-weight: 400;
  color: ${LIST_COLOR};
`;

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

  const ref = React.useRef(ListTitle.prototype);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const [textWidth, setTextWidth] = React.useState(0);
  const [textHeight, setTextHeight] = React.useState(0);

  // React.useEffect(() => {

  // }, [listItem.status]);

  // within the animation function, add logic to reset the width to zero
  // once animation is complete so other list items can trigger same
  // animation once user clicks complete
  // once animation is complete, embed the strikethrough in styles of the
  // styled component

  // separately, don't

  const animateStrike = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 5000,
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
    ref.current.measure((x, y, w, h) => {
      setTextWidth(w);
      setTextHeight(h);
      animateStrike();
    });
    // const tempItem = {id, title, details, status, whodunnit};
    // const modifyComplete =
    //   status === 'incomplete' ? (status = 'complete') : (status = 'incomplete');
    // tempItem.status = modifyComplete;
    // setListItem(tempItem);
  };

  return (
    <>
      <RowView>
        <TaskContainer>
          <View style={{borderWidth: 2, borderColor: 'white'}}>
            <ListTitle ref={ref} status={listItem.status}>
              {title}
            </ListTitle>
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
          <DoneByText style={{borderWidth: 2, borderColor: 'white'}}>
            {whodunnit}
          </DoneByText>
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
    height: 3,
    backgroundColor: 'red',
  },
});
