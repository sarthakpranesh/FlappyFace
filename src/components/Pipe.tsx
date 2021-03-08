/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

// importing globals
import Constants from '../Constant';

// importing assets
const pipeImage = require('../../assets/pipe.png');

export type PipeParams = {
  position: number[];
};

const Pipe = (props: PipeParams) => {
  const width = Constants.PIPE_WIDTH;
  const height = props.position[2];
  const x = props.position[0];
  const y = props.position[1];

  return (
    <>
      <Image
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          transform: [{rotate: '180deg'}],
        }}
        resizeMode="stretch"
        source={pipeImage}
      />
      <Image
        style={{
          position: 'absolute',
          top: y + height + Constants.GAP_SIZE,
          left: x,
          width: width,
          height:
            Constants.MAX_HEIGHT -
            height -
            Constants.GAP_SIZE -
            Constants.FLOOR_HEIGHT,
        }}
        resizeMode="stretch"
        source={pipeImage}
      />
    </>
  );
};

export default Pipe;
