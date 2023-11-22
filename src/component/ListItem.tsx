import {Text} from 'react-native';

import {List} from '../../types/data';

export default function ListItem(item: List) {
  return <Text>{item.listName}</Text>;
}
