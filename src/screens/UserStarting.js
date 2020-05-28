import React, {Component} from 'react';
import {View, Image, StyleSheet, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '831535281165-raapdh2a3l20d64qvrfkdi3co1s96utr.apps.googleusercontent.com',
});

// import Constants
import Constants from '../Constant.js';

export default class UserStarting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Home');
      }
    });
  }

  async onContinueWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredentials);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('User Cancelled Sign In', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('Working', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show(
          'Please install Google Play Services!',
          ToastAndroid.SHORT,
        );
      } else {
        console.log(error.message);
      }
    }
  }

  render() {
    return (
      <View>
        <Image
          source={require('../../assets/background-day.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Image
          source={require('../../assets/bird2.png')}
          resizeMode="contain"
          style={styles.birdImage}
        />
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.onContinueWithGoogle()}
        />
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
  googleButton: {
    position: 'absolute',
    bottom: 0,
    width: Constants.MAX_WIDTH - 100,
    height: 48,
    alignSelf: 'center',
  },
});
