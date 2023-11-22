import {FlatList, View} from 'react-native';

import ListItem from '../../component/ListItem';
import {Data} from '../../data/MockData';

export default function HomeScreen() {
  return (
    <View style={{marginTop: 50}}>
      <FlatList
        data={Data}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={item => item.listName}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
