import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Easing,
  Animated,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import Constants from '../Constant.js';

export default class GameHome extends Component {
  constructor(props) {
    super(props);

    this.onLoad = new Animated.Value(0);
    this.onPlay = new Animated.Value(0);
    this.translateBirdY = this.onLoad.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -Constants.MAX_HEIGHT / 6, -Constants.MAX_HEIGHT / 3],
      extrapolate: 'clamp',
    });
    this.buttonOpacity = this.onLoad.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    this.translateBirdX = this.onPlay.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [Constants.MAX_WIDTH, 0, -Constants.MAX_WIDTH / 4],
      extrapolate: 'clamp',
    });
    this.scaleBird = this.onPlay.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 1],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
    SoundPlayer.playSoundFile('point', 'wav');
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: new Animated.Value(1),
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();

    this.props.navigation.addListener('focus', () => {
      if (this.translateBirdX !== 0) {
        Animated.timing(this.onPlay, {
          duration: 500,
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(this.onLoad, {
            duration: 1000,
            toValue: new Animated.Value(1),
            useNativeDriver: true,
            easing: Easing.bounce,
          }).start();
        });
      }
    });
  }

  onPlayApp() {
    SoundPlayer.playSoundFile('die', 'wav');
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.onPlay, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        this.props.navigation.navigate('Play');
      });
    });
  }

  onLeaderBoardPress() {
    SoundPlayer.playSoundFile('die', 'wav');
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: 2,
      useNativeDriver: true,
    }).start(() => {
      this.props.navigation.navigate('LeaderBoard');
    });
  }

  onExitApp() {
    SoundPlayer.playSoundFile('die', 'wav');
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.onPlay, {
        duration: 1000,
        toValue: -1,
        useNativeDriver: true,
      }).start(() => {
        BackHandler.exitApp();
      });
    });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Image
          source={require('../../assets/background-day.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Animated.Image
          source={require('../../assets/bird.png')}
          resizeMode="contain"
          style={[
            styles.birdImage,
            {
              transform: [
                {translateY: this.translateBirdY},
                {translateX: this.translateBirdX},
                {scale: this.scaleBird},
              ],
            },
          ]}
        />
        <Animated.View
          style={[styles.buttonContainer, {opacity: this.buttonOpacity}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPlayApp()}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLeaderBoardPress()}>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onExitApp()}>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              auth().signOut();
              this.props.navigation.navigate('Start');
            }}>
            <Text style={styles.buttonText}>LogOut</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  logout: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'cusFont',
  },
  birdImage: {
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT / 5,
    width: Constants.MAX_WIDTH - 80,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 6,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'cusFont',
  },
});
