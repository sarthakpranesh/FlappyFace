/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image} from 'react-native';

export default class PipeTop extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let image = require('./assets/pipe-top.png');

    return (
      <Image
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
        }}
        resizeMode="stretch"
        source={image}
      />
    );
  }
}
