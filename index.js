/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {name as appName} from './app.json';
import {MyListProvider} from './src/context/ListContext';
import Navigation from './src/navigation';

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <MyListProvider>
      <Navigation colorScheme="light" />
    </MyListProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => App);
