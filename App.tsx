import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing screens
import UserStarting from './src/screens/UserStarting';
import GameHome from './src/screens/GameHome/GameHome';
import Play from './src/screens/Play';
import LeaderBoard from './src/screens/Leaderboard';

const Stack = createStackNavigator();

const DefaultStack = () => {
  const [isSigned, setIsSigned] = useState<boolean>(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setIsSigned(user !== null ? true : false);
      SplashScreen.hide();
    });
  }, []);

  return isSigned ? (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
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
  ) : (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="Start"
        component={UserStarting}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <DefaultStack />
    </NavigationContainer>
  );
}
