import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {preventAutoHideAsync, hideAsync} from 'expo-splash-screen';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

// importing screens
import UserStarting from './src/screens/UserStarting/UserStarting';
import GameHome from './src/screens/GameHome/GameHome';
import Play from './src/screens/Play/Play';
import LeaderBoard from './src/screens/LeaderBoard/LeaderBoard';

const Stack = createSharedElementStackNavigator();

const DefaultStack = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setIsSigned(user !== null ? true : false);
      if (loaded === false) {
        hideAsync();
        setLoaded(false);
      }
    });
  }, [loaded]);

  return isSigned ? (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={GameHome} />
      <Stack.Screen name="Play" component={Play} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Start" component={UserStarting} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    preventAutoHideAsync();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <DefaultStack />
    </NavigationContainer>
  );
}
