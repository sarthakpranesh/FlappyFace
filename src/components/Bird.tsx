/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

// importing globals
import Constants from '../Constant';

// importing assets
const birdImage1 = require('../../assets/bird.png');
const birdImage2 = require('../../assets/bird2.png');
const birdImage3 = require('../../assets/bird3.png');

// helper funcs
const birdFrameSelector = (pose: number) => {
  switch (pose) {
    case 0:
      return birdImage1;
    case 1:
      return birdImage2;
    case 3:
      return birdImage3;
    default:
      return birdImage1;
  }
};

const width = Constants.BIRD_WIDTH;
const height = Constants.BIRD_HEIGHT;

export type BirdParams = {
  pose: number;
  position: number[];
};

const Bird = (props: BirdParams) => {
  const x = props.position[0] - width / 2;
  const y = props.position[1] - height / 2;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: y,
    };
  });

  return (
    <Animated.Image
      style={[
        animatedStyle,
        {
          position: 'absolute',
          left: x,
          width: width,
          height: height,
        },
      ]}
      resizeMode="contain"
      source={birdFrameSelector(props.pose)}
    />
  );
};

export default Bird;
