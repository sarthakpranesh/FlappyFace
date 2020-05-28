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

import Constants from '../Constant.js';

export default class GameHome extends Component {
  constructor(props) {
    super(props);

    this.onLoad = new Animated.Value(0);
    this.onExit = new Animated.Value(0);
    this.onPlay = new Animated.Value(0);
    this.translateBirdY = this.onLoad.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -Constants.MAX_HEIGHT / 6, -Constants.MAX_HEIGHT / 3],
      extrapolate: 'clamp',
    });
    this.buttonOpacity = this.onLoad.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
    this.translateBirdX = this.onExit.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Constants.MAX_WIDTH],
    });
    this.translateBirdX = this.onPlay.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -Constants.MAX_WIDTH / 4],
    });
    this.scaleBird = this.onPlay.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.44],
    });
  }

  componentDidMount() {
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: new Animated.Value(1),
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();

    this.props.navigation.addListener('focus', () => {
      if (this.translateBirdX !== 0) {
        Animated.timing(this.onPlay, {
          duration: 1000,
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
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: 2,
      useNativeDriver: true,
    }).start();
  }

  onExitApp() {
    Animated.timing(this.onLoad, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.onExit, {
        duration: 1000,
        toValue: 1,
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
          source={require('../../assets/bird2.png')}
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
  birdImage: {
    width: 100,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Constants.MAX_HEIGHT / 4,
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
  },
});
