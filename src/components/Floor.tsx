/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

// importing globals
import Constants from '../Constant';
const width = Constants.MAX_WIDTH;
const height = Constants.FLOOR_HEIGHT;

// importing assets
const floor = require('../../assets/base.png');

export type FloorParams = {
  position: number[];
};

const Floor = (props: FloorParams) => {
  const x = props.position[0];
  const y = props.position[1];
  return (
    <Image
      style={{
        position: 'absolute',
        width: width,
        height: height,
        top: y,
        left: x,
      }}
      resizeMode="stretch"
      source={floor}
    />
  );
};

export default Floor;
