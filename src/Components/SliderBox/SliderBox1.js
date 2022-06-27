import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

export default class SliderBoxx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesFries: [
        require('../../asserts/Images/fry.jpeg'), // Local image
      ],
      imagesWings: [
        require('../../asserts/Images/wing.jpeg'), // Local image
      ],
      imagesZingers: [require('../../asserts/Images/burgerDeal.jpeg')],
    };
  }

  render() {
    return (
      <SliderBox
        images={this.state.imagesFries}
        dotColor="#DFBC50"
        inactiveDotColor="#90A4AE"
        sliderBoxHeight={160}
        dotStyle={{}}
        autoplay
        circleLoop={true}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        ImageComponentStyle={{
          borderRadius: 19,
          width: '95%',
          marginTop: '8%',
        }}
      />
    );
  }
}
