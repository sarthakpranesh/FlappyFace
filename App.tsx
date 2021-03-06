import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing screens
import UserStarting from './src/screens/UserStarting.js';
import GameHome from './src/screens/GameHome.js';
import Play from './src/screens/Play.js';
import LeaderBoard from './src/screens/Leaderboard.js';

const Stack = createStackNavigator();

class DefaultStack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigned: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.setState({isSigned: user ? true : false});
      SplashScreen.hide();
    });
  }

  render() {
    const {isSigned} = this.state;

    return isSigned ? (
      <Stack.Navigator
        options={{
          animationEnabled: false,
        }}
        initialRouteName="Home"
        headerMode="none">
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
      <Stack.Navigator
        options={{
          animationEnabled: false,
        }}
        initialRouteName="Home"
        headerMode="none">
        <Stack.Screen
          options={{
            animationEnabled: false,
          }}
          name="Start"
          component={UserStarting}
        />
      </Stack.Navigator>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <DefaultStack />
    </NavigationContainer>
  );
}
