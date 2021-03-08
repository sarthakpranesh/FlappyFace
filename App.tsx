import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing screens
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import UserStarting from './src/screens/UserStarting/UserStarting';
import GameHome from './src/screens/GameHome/GameHome';
import Play from './src/screens/Play/Play';
import LeaderBoard from './src/screens/LeaderBoard/LeaderBoard';

const Stack = createStackNavigator();

const DefaultStack = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (loaded === false) {
        setLoaded(true);
      }
      setIsSigned(user !== null ? true : false);
    });
  }, [loaded]);

  if (loaded === false) {
    return <SplashScreen />;
  }

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
