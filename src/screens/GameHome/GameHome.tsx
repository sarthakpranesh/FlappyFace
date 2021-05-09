import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {SharedElement} from 'react-navigation-shared-element';

// importing globals
import Constants from '../../Constant';
import Styles from '../../Styles';

const {height} = Dimensions.get('window');

type GameHomeParams = {
  navigation: any;
};

const GameHome = (props: GameHomeParams) => {
  const onLoad = useSharedValue(0);
  const onPlay = useSharedValue(0);

  const onPlayApp = () => {
    SoundPlayer.playSoundFile('die', 'wav');
    onLoad.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.ease,
      },
      d1 => {
        if (d1) {
          onPlay.value = withTiming(
            1,
            {
              duration: 1000,
              easing: Easing.ease,
            },
            d2 => {
              if (d2) {
                runOnJS(props.navigation.navigate)('Play');
              }
            },
          );
        }
      },
    );
  };

  const onLeaderBoardPress = () => {
    SoundPlayer.playSoundFile('die', 'wav');
    props.navigation.navigate('LeaderBoard');
  };

  const onExitApp = () => {
    SoundPlayer.playSoundFile('die', 'wav');
    onLoad.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.ease,
      },
      d1 => {
        if (d1) {
          onPlay.value = withTiming(
            -1,
            {
              duration: 1000,
              easing: Easing.ease,
            },
            d2 => {
              if (d2) {
                runOnJS(BackHandler.exitApp)();
              }
            },
          );
        }
      },
    );
  };

  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure, you want to logout of the app?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth().signOut();
          },
        },
        {text: 'No'},
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    onLoad.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bounce,
    });

    props.navigation.addListener('focus', () => {
      SoundPlayer.playSoundFile('point', 'wav');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedBirdStyles = useAnimatedStyle(() => {
    const translateBirdY = interpolate(
      onLoad.value,
      [0, 1, 2],
      [0, -Constants.MAX_HEIGHT / 6, -Constants.MAX_HEIGHT / 3],
      Extrapolate.CLAMP,
    );
    const translateBirdX = interpolate(
      onPlay.value,
      [-1, 0, 1],
      [Constants.MAX_WIDTH, 0, -Constants.MAX_WIDTH / 4],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY: translateBirdY}, {translateX: translateBirdX}],
    };
  });

  const animatedButtonStyles = useAnimatedStyle(() => {
    const buttonOpacity = interpolate(
      onLoad.value,
      [0, 1, 2],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: buttonOpacity,
    };
  });

  return (
    <View style={styles.viewContainer}>
      <Image
        source={require('../../../assets/background-day.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <Animated.View style={[styles.birdImage, animatedBirdStyles]}>
        <SharedElement id="flappyBirdImage">
          <Image
            source={require('../../../assets/bird.png')}
            resizeMode="contain"
            style={[styles.birdImage]}
          />
        </SharedElement>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, animatedButtonStyles]}>
        <TouchableOpacity style={styles.button} onPress={() => onPlayApp()}>
          <Text style={[styles.buttonText, Styles.fontSmall]}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLeaderBoardPress()}>
          <Text style={[styles.buttonText, Styles.fontSmall]}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onExitApp()}>
          <Text style={[styles.buttonText, Styles.fontSmall]}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogout()}>
          <Text style={[styles.buttonText, Styles.fontSmall]}>LogOut</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

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
    width: Constants.BIRD_IMAGE_WIDTH,
    height: Constants.BIRD_IMAGE_HEIGHT,
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
    marginVertical: height * 0.01,
    paddingHorizontal: 30,
    paddingVertical: height * 0.01,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'cusFont',
  },
});

export default GameHome;
