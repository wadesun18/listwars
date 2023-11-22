/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import Navigation from './src/navigation';

const App = () => <Navigation colorScheme="light" />;

AppRegistry.registerComponent(appName, () => App);
