import React from 'react';
import {Image, StyleSheet} from 'react-native';

// importing globals
import Constants from '../../Constant';

const SplashScreen = () => {
  return (
    <Image
      source={require('../../../assets/launchScreen.png')}
      style={styles.backgroundImage}
      resizeMode="stretch"
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    zIndex: 1,
  },
});

export default SplashScreen;
