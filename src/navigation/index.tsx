import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

import CreateScreen from '../screen/CreateScreen/CreateScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import LaunchScreen from '../screen/Onboarding/LaunchScreen';
import StartScreen from '../screen/StartScreen/StartScreen';
import BackButton from '../component/BackButton';
import { LIST_COLOR } from '../constants';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Create: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: 'Create a New List',
          headerStyle: { backgroundColor: '#000' },
          headerTitleStyle: { color: LIST_COLOR, fontFamily: 'Montserrat-SemiBold', fontSize: 25, fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding"
        component={LaunchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
