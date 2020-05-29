/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';
import birdImage from '../../assets/bird.png';

import Constants from '../Constant.js';

export default class Bird extends Component {
  constructor(props) {
    super(props);

    this.width = Constants.BIRD_WIDTH;
    this.height = Constants.BIRD_HEIGHT;
  }

  render() {
    const x = this.props.position[0] - this.width / 2;
    const y = this.props.position[1] - this.height / 2;
    return (
      <Image
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: this.width,
          height: this.height,
        }}
        resizeMode="contain"
        source={birdImage}
      />
    );
  }
}
