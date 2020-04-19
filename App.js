import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import firebase from './config/firebase';

// importing utils
import {checkUserExists} from './src/utils/firebaseHelpers.js';

//importing other files and libs
import Constants from './src/Constant'; //setup some fixed properties in the file
import {GameEngine} from 'react-native-game-engine'; //game engine for our app
import Matter from 'matter-js'; //physics library

//importing actual objects, these components are used to display different spaces on the screen
import Bird from './src/Bird';
import Floor from './src/Floor';

//importing physics that are created to make the world interactive, has settings that make the world feel real
import Physics, {resetPipes, stopGame, startGame} from './src/Physics';

// useful constants
const {width, height} = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props); //App is extending class Components hence super(props) passes the props to the Component class
    this.gameEngine = null;
    this.entities = this.setupWorld(); //used to set the Engine World up

    this.state = {
      running: true,
      score: 0,
      user: null,
      username: 'Sarthak',
      password: '',
    };

    this.usernameInput = null;
  }

  setUsername = username => {
    if (!username) {
      this.setState({
        username: ' ',
      });
      return;
    }
    this.setState({
      username: username.trim(),
    });
  };

  setPassword = pass => {
    if (!pass) {
      this.setState({
        pass: ' ',
      });
      return;
    }
    this.setState({
      pass: pass.trim(),
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          username: '',
        });
      }
    });
  }

  play = async () => {
    const {username} = this.state;

    // if username is not set
    if (!username.trim()) {
      Alert.alert(
        'Need Player Name',
        'Please Enter your player name before you continue!',
        [{text: 'Ok'}],
        {
          cancelable: true,
        },
      );
      return;
    }

    try {
      const user = await checkUserExists(username);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false}); //creates the world engine
    let world = engine.world; //creates the world
    world.gravity.y = 0;

    //different bodies in the world, inform of rectangles ( isStatic is set to true for making bodies on which physics don't apply )
    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT,
    );
    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2 + Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    //adding all the bodies to our game world
    Matter.World.add(world, [bird, floor1, floor2]);

    Matter.Events.on(engine, 'collisionStart', event => {
      //broadcast an event called "game-over"
      this.gameEngine.dispatch({type: 'game-over'});
    });

    return {
      physics: {engine: engine, world: world},
      bird: {body: bird, pose: 1, renderer: Bird},
      floor1: {body: floor1, renderer: Floor},
      floor2: {body: floor2, renderer: Floor},
    };
  };

  onEvent = e => {
    if (e.type === 'score') {
      this.setState({
        score: this.state.score + 1,
      });
    } else if (e.type === 'game-over') {
      stopGame();
      this.setState({
        running: false, //on collision we stop the game
      });
    }
  };

  //reset the game to play again
  reset = () => {
    resetPipes();
    startGame();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0,
    });
  };

  renderGame = () => {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/background-day.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          style={StyleSheet.gameContainer}
          systems={[Physics]}
          entities={this.entities}
          onEvent={this.onEvent}
          running={this.state.running}
        />
        <Text style={styles.score}>{this.state.score}</Text>
        {!this.state.running && (
          <TouchableOpacity
            onPress={this.reset}
            style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <Text style={styles.gameOverSubText}>Try Again</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderSignIn = () => {
    return (
      <View style={signInStyles.signInContainer}>
        <Image
          source={require('./assets/bird2.png')}
          style={signInStyles.signInBird}
        />
        <TextInput
          ref={input => {
            this.usernameInput = input;
          }}
          placeholder="Player Name"
          style={signInStyles.textInput}
          placeholderTextColor="white"
          onChangeText={username => this.setUsername(username)}
          value={this.state.username}
        />
        <TouchableOpacity
          onPress={() => {
            this.play();
          }}
          style={signInStyles.signInBtn}>
          <Text style={signInStyles.signInBtnText}>PLAY</Text>
        </TouchableOpacity>
        <Text style={signInStyles.signInGameName}>Flappy Bird Mania</Text>
      </View>
    );
  };

  render() {
    const {user} = this.state;
    if (!user) {
      return this.renderSignIn();
    }

    return this.renderGame();
  }
}

const signInStyles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    fontFamily: '',
  },
  signInBtn: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  signInBtnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: '',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    width: width - 100,

    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,

    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: '',
  },
  signInBird: {
    width: 100,
    height: 80,
    padding: 10,
  },
  signInGameName: {
    fontSize: width / 10,
    color: 'white',
    position: 'absolute',
    bottom: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 30,
    alignSelf: 'center',
    textShadowColor: '#444444',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    zIndex: 100,
    fontFamily: 'monospace',
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'monospace',
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'monospace',
  },
});
