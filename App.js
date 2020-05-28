import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing screens
import UserStarting from './src/screens/UserStarting.js';
import GameHome from './src/screens/GameHome.js';

const Stack = createStackNavigator();

function DefaultStack() {
  return (
    <Stack.Navigator initialRouteName="Start" headerMode="none">
      <Stack.Screen name="Start" component={UserStarting} />
      <Stack.Screen name="Home" component={GameHome} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <DefaultStack />
    </NavigationContainer>
  );
}
