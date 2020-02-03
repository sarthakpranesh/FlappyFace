import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

//importing other files and libs
import Constants from "./Constant"; //setup some fixed properties in the file
import { GameEngine } from "react-native-game-engine"; //game engine for our app
import Matter from "matter-js"; //physics library

//importing actual objects, these components are used to display different spaces on the screen
import Bird from "./Bird" 
import Wall from "./Wall"

//importing physics that are created to make the world interactive, has settings that make the world feel real
import Physics from "./Physics"

//random function to return values between min and max parameters
export const randomBetween = (min, max)=>{
  return Math.floor(Math.random()*(max-min+1)+min);
}

//returns an array of heights of two pipes (one pair of pipes)
export const generatePipes = ()=>{
  let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT/2)-100);
  let bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if(Math.random() < 0.5){
    sizes = sizes.reverse();
  }

  return sizes;
}

export default class App extends Component {
  //default constructor
  constructor(props){
    super(props); //App is extending class Components hence super(props) passes the props to the Component class
    this.gameEngine = null;
    this.entities = this.setupWorld(); //used to set the Engine World up

    this.state = {
      running: true //keeps track of the state of the game
    }
  }

  setupWorld = ()=>{
    let engine = Matter.Engine.create({ enableSleeping: false }); //creates the world engine
    let world = engine.world; //creates the world

    //different bodies in the world, inform of rectangles ( isStatic is set to true for making bodies on which physics don't apply )
    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH/4, Constants.MAX_HEIGHT/2, 50, 50);
    let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true});
    let ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, 10, Constants.MAX_WIDTH, 25, { isStatic: true });

    let [pipe1Height, pipe2Height] = generatePipes();
    let pipe1 = Matter.Bodies.rectangle( Constants.MAX_WIDTH-(Constants.PIPE_WIDTH/2), pipe1Height/2, Constants.PIPE_WIDTH, pipe1Height, { isStatic: true })
    let pipe2 = Matter.Bodies.rectangle( Constants.MAX_WIDTH-(Constants.PIPE_WIDTH/2), Constants.MAX_HEIGHT - (pipe2Height/2), Constants.PIPE_WIDTH, pipe2Height, { isStatic: true })

    let [pipe3Height, pipe4Height] = generatePipes();
    let pipe3 = Matter.Bodies.rectangle( Constants.MAX_WIDTH*2-(Constants.PIPE_WIDTH/2), pipe3Height/2, Constants.PIPE_WIDTH, pipe3Height, { isStatic: true })
    let pipe4 = Matter.Bodies.rectangle( Constants.MAX_WIDTH*2-(Constants.PIPE_WIDTH/2), Constants.MAX_HEIGHT - (pipe4Height/2), Constants.PIPE_WIDTH, pipe4Height, { isStatic: true })

    //adding all the bodies to our game world
    Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);

    Matter.Events.on(engine, "collisionStart", event=>{
      //the below commented line can be used to broadcast an event called "game-over"
      // this.gameEngine.dispatch({ type: "game-over"});
      this.setState({
        running: false //on collision we stop the game
      })
    })

    return {
      physics: { engine: engine, world: world},
      bird: { body: bird, size: [50, 50], color: "red", renderer: Bird },
      floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: "green", renderer: Wall },
      ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: "green", renderer: Wall },
      pipe1: { body: pipe1, size: [Constants.PIPE_WIDTH, pipe1Height], color: "green", renderer: Wall },
      pipe2: { body: pipe2, size: [Constants.PIPE_WIDTH, pipe2Height], color: "green", renderer: Wall },
      pipe3: { body: pipe3, size: [Constants.PIPE_WIDTH, pipe3Height], color: "green", renderer: Wall },
      pipe4: { body: pipe4, size: [Constants.PIPE_WIDTH, pipe4Height], color: "green", renderer: Wall }
    }
  }

  //reset the game to play again
  reset = () =>{
    this.gameEngine.swap(this.setupWorld())
    this.setState({
      running: true
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <GameEngine
            ref={(ref) => { this.gameEngine = ref; }}
            style={StyleSheet.gameContainer}
            systems={[Physics]}
            entities={this.entities}
            running={this.state.running}
          />
          {!this.state.running && 
          <TouchableOpacity onPress={this.reset} style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
            </View>
          </TouchableOpacity>}
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center"
  }, 
  gameOverText: {
    color: "white",
    fontSize: 48,
  }
});