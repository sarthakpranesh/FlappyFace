/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';

import Constants from '../Constant.js';

export default class Floor extends Component {
  constructor(props) {
    super(props);

    this.width = Constants.MAX_WIDTH;
    this.height = Constants.FLOOR_HEIGHT;
  }

  render() {
    const x = this.props.position[0];
    const y = this.props.position[1];
    return (
      <Image
        style={{
          position: 'absolute',
          width: this.width,
          height: this.height,
          top: y,
          left: x,
        }}
        resizeMode="stretch"
        source={require('../../assets/base.png')}
      />
    );
  }
}
