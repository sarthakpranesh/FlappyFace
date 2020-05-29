/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';
import pipeImage from '../../assets/pipe.png';
import Constants from '../Constant';

export default class Pipe extends Component {
  render() {
    const width = Constants.PIPE_WIDTH;
    const height = this.props.position[2];
    const x = this.props.position[0];
    const y = this.props.position[1];

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
  }
}
