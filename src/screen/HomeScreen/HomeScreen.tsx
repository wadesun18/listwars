import {Text, View} from 'react-native';

import ListItem from '../../component/ListItem';
import {
  ExampleListOne,
  ExampleListThree,
  ExampleListTwo,
} from '../../data/MockData';

export default function HomeScreen() {
  return (
    <View style={{marginTop: 50}}>
      <ListItem {...ExampleListOne} />
      <ListItem {...ExampleListTwo} />
      <ListItem {...ExampleListThree} />
    </View>
  );
}
