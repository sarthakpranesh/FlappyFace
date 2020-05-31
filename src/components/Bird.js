/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';
import birdImage1 from '../../assets/bird.png';
import birdImage2 from '../../assets/bird2.png';
import birdImage3 from '../../assets/bird3.png';

import Constants from '../Constant.js';

export default class Bird extends Component {
  constructor(props) {
    super(props);

    this.width = Constants.BIRD_WIDTH;
    this.height = Constants.BIRD_HEIGHT;
  }

  birdFrameSelector = () => {
    if (this.props.pose === 0) {
      return birdImage1;
    } else if (this.props.pose === 1) {
      return birdImage2;
    } else if (this.props.pose === 2) {
      return birdImage3;
    } else {
      return birdImage1;
    }
  };

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
        source={this.birdFrameSelector()}
      />
    );
  }
}
