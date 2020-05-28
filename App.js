import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing screens
import UserStarting from './src/screens/UserStarting.js';
import GameHome from './src/screens/GameHome.js';
import Play from './src/screens/Play.js';
import LeaderBoard from './src/screens/Leaderboard.js';

const Stack = createStackNavigator();

function DefaultStack() {
  return (
    <Stack.Navigator
      options={{
        animationEnabled: false,
      }}
      initialRouteName="Start"
      headerMode="none">
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="Start"
        component={UserStarting}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="Home"
        component={GameHome}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="Play"
        component={Play}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="LeaderBoard"
        component={LeaderBoard}
      />
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
