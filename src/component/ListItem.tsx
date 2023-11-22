import {Text} from 'react-native';

import {List} from '../../types/data';

export default function ListItem({item}: {item: List}) {
  console.log('List', item);
  return <Text>{item.listName}</Text>;
}
