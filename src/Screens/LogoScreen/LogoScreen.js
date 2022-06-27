import React, {PureComponent} from 'react';
import {
  Pressable,
  ScrollView,
  Modal,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  StatusBar,
  Text,
} from 'react-native';
// import Animated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from '../LogoScreen/style';
import {SvgUri} from 'react-native-svg';
import NetInfo from '@react-native-community/netinfo';

const position = new Animated.ValueXY({x: 0, y: 260});

export default class LogoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        {key: 0, city: 'MM Alam Road Lahore'},
        {key: 1, city: 'Johar Town Lahore'},
      ],
      pickerModal: false,
      loader: true,
      animte: false,
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({loader: false});
    }, 3000);

    setTimeout(() => {
      Animated.timing(position, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }).start();
    }, 1300);

    setTimeout(() => {
      this.setState({animte: true});
    }, 1300);

    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1200);
  }

  renderCities = () => {
    return this.state.cities.map(item => {
      return (
        <Pressable
          style={{paddingHorizontal: 10, margin: 7, alignItems: 'flex-start'}}
          onPress={() => {
            this.setState({city: item.city});
            this.setState({pickerModal: false});
          }}
          key={item.key}>
          <Text style={style.cityTxt}>{item.city}</Text>
        </Pressable>
      );
    });
  };

  animteDown = () => {
    this.setState({animte: false});
    Animated.timing(position, {
      toValue: {x: 0, y: 260},
      useNativeDriver: true,
    }).start();
  };
  checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setTimeout(() => {
          this.setState({loader: false});
          this.props.navigation.replace('Home');
        }, 1700);
      } else {
        null;
      }
      console.log('Is connected?', state.isConnected);
    });
  };
  render() {
    return (
      <SafeAreaView style={style.container}>
        <StatusBar hidden={true} />
        <Animated.View style={{transform: [{translateY: position.y}]}}>
          <Image
            style={style.img}
            source={require('../../asserts/Images/howdy.jpeg')}
          />
        </Animated.View>

        {this.state.animte ? (
          <Animated.View
            style={{
              width: Dimensions.get('window').width,
              alignItems: 'center',
              opacity: this.state.fadeAnim,
            }}>
            <Pressable
              style={style.sectionStyle}
              onPress={() => {
                this.setState({pickerModal: true});
              }}>
              <View pointerEvents="none">
                <Text
                  style={{
                    color: this.state.city ? 'black' : 'grey',
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {this.state.city
                    ? this.state.city
                    : 'Choose Your Nearest Location'}
                </Text>
              </View>
              <MaterialIcons
                name={'arrow-drop-down'}
                size={20}
                color={this.state.city ? 'black' : 'grey'}
              />
            </Pressable>

            <Pressable
              style={style.loginBtn}
              onPress={() => {
                this.checkConnection();
                this.animteDown();
                this.setState({
                  loader: true,
                });
              }}>
              <Text style={style.confirmTxt}>Confirm</Text>
            </Pressable>
          </Animated.View>
        ) : null}

        {this.state.loader ? (
          <LottieView
            style={style.lottie}
            source={require('../../asserts/Animations/load.json')}
            autoPlay
            loop={true}
          />
        ) : null}

        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({pickerModal: false});
          }}
          visible={this.state.pickerModal}>
          <Pressable
            onPress={() => {
              this.setState({pickerModal: false});
            }}
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <View style={style.containerr}>{this.renderCities()}</View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    );
  }
}
