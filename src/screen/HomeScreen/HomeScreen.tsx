import {Text, View} from 'react-native';

import {
  ExampleListOne,
  ExampleListThree,
  ExampleListTwo,
} from '../../data/MockData';

export default function HomeScreen() {
  return (
    <View>
      <Text style={{marginTop: 50}}>{ExampleListOne.listName}</Text>
      <Text>{ExampleListTwo.listName}</Text>
      <Text>{ExampleListThree.listName}</Text>
    </View>
  );
}
