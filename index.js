/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import {MyListProvider} from './src/context/ListContext';
import Navigation from './src/navigation';

const App = () => (
  <MyListProvider>
    <Navigation colorScheme="light" />
  </MyListProvider>
);

AppRegistry.registerComponent(appName, () => App);
