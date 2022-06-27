import React, {Component, PureComponent} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  StatusBar,
  View,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCart, removeFromCart} from '../../Redux/Action/actions';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Pinchable from 'react-native-pinchable';
const animation = {
  0: {opacity: 0, translateY: 70},
  1: {opacity: 1, translateY: 0},
};
const duration = 200;
class FoodDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCartModal: false,
      imgLoading: false,
      showImgModal: false,
      checked: 'pepsi',
      steak: 'MashedPotato',
      burger: 'Plain Fryz',
      scaleValue: new Animated.Value(0),
      textLenth: null,
      numberOfLines: 1.7,
    };
  }

  animateModal = () => {
    Animated.spring(this.state.scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {Product} = this.props.route.params;
    const {checked, steak, burger} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView
          contentContainerStyle={{paddingBottom: '5%'}}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.containerrr, {width: 500, height: 110}]}>
            <View
              style={[
                styles.background,
                {
                  backgroundColor: 'blue',
                },
              ]}>
              <View
                style={[
                  styles.image,
                  {
                    width: 500,
                    height: 170,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: '11%',
                    flexDirection: 'row',
                    backgroundColor: 'red',
                  },
                ]}>
                <View style={styles.cartBtnBlue}>
                  <Pressable
                    onPress={() => {
                      this.props.navigation.navigate('Menu');
                    }}>
                    <Ionicons name={'arrow-back'} size={22} color={'white'} />
                  </Pressable>
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 38,
                    marginTop: 10,
                    fontFamily: 'Rustler',
                  }}>
                  {Product.Cat}
                </Text>
                <Pressable
                  style={styles.cartBtnBlue}
                  onPress={() => {
                    this.props.navigation.navigate('Cart');
                  }}>
                  <Ionicons name="cart-sharp" size={22} color={'white'} />
                  {this.props.reducer.length >= 1 ? (
                    <Text
                      style={[
                        styles.topLinksTxtColorChangeTop,
                        {
                          fontWeight: '500',
                          color: 'white',
                          fontSize: 15,
                          marginTop: '-27%',
                        },
                      ]}>
                      {this.props.reducer.length}
                    </Text>
                  ) : null}
                </Pressable>
              </View>
            </View>
          </View>
          <Animatable.View
          // iterationCount={1}
          // useNativeDriver
          // animation="bounceInDown"
          // delay={duration}
          >
            <Pressable
              style={{alignSelf: 'center', marginTop: 20}}
              onPress={() => {
                this.setState({showImgModal: true});
              }}>
              <FastImage
                style={[{height: 220, borderRadius: 220 / 2, width: 220}]}
                source={{
                  uri: Product.Img,
                }}
              />

              {/* <View style={styles.background}>
              <FastImage
                style={[styles.image, {height: 200, width: 500}]}
                source={{
                  uri: Product.Img,
                }}
              />
            </View> */}
            </Pressable>
          </Animatable.View>
          {/* <View
            style={{
              backgroundColor: '#DA2328',
              paddingHorizontal: '2%',
              height: 140,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: Dimensions.get('window').width,
            }}>
            <View style={styles.cartBtnBlue}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Menu');
                }}>
                <Ionicons name={'arrow-back'} size={22} color={'white'} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Product.Cat}
            </Text>
            <TouchableOpacity
              style={styles.cartBtnBlue}
              onPress={() => {
                this.props.navigation.navigate('Cart');
              }}>
              <Ionicons name="cart-sharp" size={22} color={'white'} />
              {this.props.reducer.length >= 1 ? (
                <Text
                  style={[
                    styles.topLinksTxtColorChangeTop,
                    {
                      fontWeight: '500',
                      color: 'white',
                      fontSize: 15,
                      marginTop: '-27%',
                    },
                  ]}>
                  {this.props.reducer.length}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View> */}

          <View style={{}}>
            <Animatable.View
              // useNativeDriver
              // animation={animation}
              // delay={duration}
              style={{
                marginBottom: 14,
                paddingHorizontal: '1%',
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  transform: [{rotate: '7deg'}],
                  width: 25,
                  height: 25,
                }}
                tintColor="#DFBC50"
                source={require('../../asserts/Images/favourites.png')}
              />
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontFamily: 'RobotoSlab-Bold',
                    fontSize: 22,
                    marginLeft: -5,
                    color: 'white',
                  },
                ]}>
                {Product.Title}
              </Text>
            </Animatable.View>
            <View style={{paddingHorizontal: '3%', marginTop: 1}}>
              <Animatable.Text
                // useNativeDriver
                // animation={animation}
                // delay={duration}
                numberOfLines={this.state.numberOfLines}
                style={{
                  color: 'grey',
                  fontSize: 15,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                {Product.SubTitle}
                {this.state.numberOfLines === 3 ? (
                  <Text
                    onPress={() => {
                      this.setState({numberOfLines: 3});
                    }}
                    style={{
                      fontSize: 15,
                      fontFamily: 'RobotoSlab-Bold',
                      color: 'red',
                    }}>
                    Show more
                  </Text>
                ) : (
                  <Text
                    onPress={() => {
                      this.setState({numberOfLines: 2});
                    }}
                    style={{
                      fontSize: 15,
                      fontFamily: 'RobotoSlab-Bold',
                      color: 'red',
                    }}>
                    Show less
                  </Text>
                )}
              </Animatable.Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 12,
                paddingHorizontal: '3%',
              }}>
              <Animatable.Text
                // useNativeDriver
                // animation="slideInLeft"
                // delay={duration}
                style={{
                  fontSize: 22,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}>
                PKR {Product.Price}
              </Animatable.Text>

              {Product.Type == 'AVAILABLE FOR DINE IN ONLY' ? null : (
                <Animatable.View
                  // useNativeDriver
                  // animation="slideInRight"
                  // delay={duration}
                  style={{
                    borderWidth: 0.3,
                    width: '32%',
                    padding: 10,
                    height: 60,
                    borderRadius: 30,
                    borderColor: 'grey',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    onPress={() => {}}
                    style={{
                      width: 27,
                      height: 27,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 27 / 2,
                      backgroundColor: '#2C2C2C',
                    }}>
                    <AntDesign name={'minus'} size={22} color={'white'} />
                  </Pressable>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 20,
                      color: 'white',
                      fontFamily: 'RobotoSlab-Bold',
                    }}>
                    1
                  </Text>
                  <Pressable
                    onPress={() => {}}
                    style={{
                      width: 27,
                      height: 27,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 27 / 2,
                      backgroundColor: '#FED116',
                    }}>
                    <AntDesign name={'plus'} size={22} color={'black'} />
                  </Pressable>
                </Animatable.View>
              )}
            </View>
            {Product.Type == 'AVAILABLE FOR DINE IN ONLY' ? (
              <Animatable.Text
                // useNativeDriver
                // animation={animation}
                // delay={duration}
                style={{
                  fontFamily: 'RobotoSlab-Bold',
                  color: '#DA2328',
                  fontSize: 13,
                  paddingHorizontal: '3%',
                  marginTop: 12,
                }}>
                {Product.Type}
              </Animatable.Text>
            ) : null}
            {Product.SubTitle == 'Soda Drinks' ? (
              <Animatable.View
                // useNativeDriver
                // animation={animation}
                // delay={duration}
                style={{
                  borderRadius: 35,
                  marginTop: 18,
                  paddingHorizontal: '4%',
                  paddingVertical: '5%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  backgroundColor: '#2C2C2C',
                  width: Dimensions.get('window').width,
                }}>
                <View
                  style={{
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: 20,
                      transform: [{rotate: '7deg'}],
                      height: 20,
                    }}
                    tintColor="#DFBC50"
                    source={require('../../asserts/Images/favourites.png')}
                  />
                  <Text
                    style={[
                      styles.topLinksTxtColorChangeTop,
                      {
                        fontSize: 20,
                        fontFamily: 'RobotoSlab-Bold',
                        marginLeft: -2,
                        color: 'white',
                      },
                    ]}>
                    Soda Drinks
                  </Text>
                </View>
                <Text
                  style={[
                    styles.topLinksTxtColorChangeTop,
                    {
                      fontSize: 12,
                      alignSelf: 'flex-start',
                      color: 'grey',
                      marginBottom: 2,
                      fontFamily: 'RobotoSlab-Bold',
                    },
                  ]}>
                  Choose any 1 (Required)
                </Text>

                <View
                  style={{
                    alignSelf: 'flex-start',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      uncheckedColor="white"
                      color="red"
                      value="pepsi"
                      status={checked === 'pepsi' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({checked: 'pepsi'});
                        console.log(checked);
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Bold',
                        fontSize: 12,
                        color: 'white',
                      }}>
                      pepsi
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      uncheckedColor="white"
                      color="red"
                      value="7up"
                      status={checked === '7up' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({checked: '7up'});
                        console.log(checked);
                      }}
                    />
                    <Text
                      style={[
                        styles.topLinksTxtColorChangeTop,
                        {
                          fontFamily: 'RobotoSlab-Bold',
                          fontSize: 12,
                          color: 'white',
                        },
                      ]}>
                      7up
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      uncheckedColor="white"
                      color="red"
                      value="Marinda"
                      status={
                        this.state.checked === 'Marinda'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => this.setState({checked: 'Marinda'})}
                    />
                    <Text
                      style={[
                        styles.topLinksTxtColorChangeTop,
                        {
                          fontFamily: 'RobotoSlab-Bold',
                          fontSize: 12,
                          color: 'white',
                        },
                      ]}>
                      Marinda
                    </Text>
                  </View>
                </View>
              </Animatable.View>
            ) : null}

            {Product.Cat == 'steaks' ? (
              <Animatable.View
                // useNativeDriver
                // animation={animation}
                // delay={duration}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#2C2C2C',
                  borderRadius: 35,
                  marginTop: 18,
                  width: Dimensions.get('window').width,
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  paddingHorizontal: '4%',
                  paddingVertical: '5%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Image
                    style={{
                      width: 20,
                      transform: [{rotate: '7deg'}],
                      height: 20,
                    }}
                    tintColor="#DFBC50"
                    source={require('../../asserts/Images/favourites.png')}
                  />
                  <Text
                    style={[
                      styles.topLinksTxtColorChangeTop,
                      {
                        fontSize: 20,
                        fontFamily: 'RobotoSlab-Bold',
                        color: 'white',
                      },
                    ]}>
                    Chicken Steaks Add On
                  </Text>
                </View>
                <Text
                  style={[
                    styles.topLinksTxtColorChangeTop,
                    {
                      fontFamily: 'RobotoSlab-Bold',
                      fontSize: 12,
                      color: 'grey',
                    },
                  ]}>
                  Choose any 1 (Required)
                </Text>

                <View style={{}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      uncheckedColor="white"
                      color="red"
                      value="MashedPotato"
                      status={
                        steak === 'MashedPotato' ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        this.setState({steak: 'MashedPotato'});
                        console.log(steak);
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'RobotoSlab-Bold',
                        color: 'white',
                      }}>
                      Mashed Potato
                    </Text>
                  </View>
                </View>
              </Animatable.View>
            ) : null}
            {Product.Cat == 'burgers' ? (
              <Animatable.View
                // useNativeDriver
                // animation={animation}
                // delay={duration}
                style={{
                  borderRadius: 35,
                  marginTop: 18,
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  backgroundColor: '#2C2C2C',
                  width: Dimensions.get('window').width,
                }}>
                <View
                  style={{
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: 20,
                      transform: [{rotate: '7deg'}],
                      height: 20,
                    }}
                    tintColor="#DFBC50"
                    source={require('../../asserts/Images/favourites.png')}
                  />
                  <Text
                    style={[
                      styles.topLinksTxtColorChangeTop,
                      {
                        fontSize: 20,
                        fontFamily: 'RobotoSlab-Bold',
                        marginLeft: -2,
                        color: 'white',
                      },
                    ]}>
                    Fryz
                  </Text>
                </View>
                <Text
                  style={[
                    styles.topLinksTxtColorChangeTop,
                    {
                      fontSize: 12,
                      alignSelf: 'flex-start',
                      fontFamily: 'RobotoSlab-Bold',
                      color: 'grey',
                    },
                  ]}>
                  Choose any 1 (Required)
                </Text>

                <View style={{alignSelf: 'flex-start'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      uncheckedColor="white"
                      color="red"
                      value="Plain Fryz"
                      status={burger === 'Plain Fryz' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({burger: 'Plain Fryz'});
                        console.log(burger);
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Bold',
                        fontSize: 12,
                        color: 'white',
                      }}>
                      Plain Fryz
                    </Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 12,
                      marginTop: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: 20,
                        transform: [{rotate: '7deg'}],
                        height: 20,
                      }}
                      tintColor="#DFBC50"
                      source={require('../../asserts/Images/favourites.png')}
                    />
                    <Text
                      style={[
                        styles.topLinksTxtColorChangeTop,
                        {
                          fontSize: 20,
                          fontFamily: 'RobotoSlab-Bold',
                          marginLeft: -2,
                          color: 'white',
                        },
                      ]}>
                      Soda Drinks
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.topLinksTxtColorChangeTop,
                      {
                        fontSize: 12,
                        alignSelf: 'flex-start',
                        color: 'grey',
                        fontFamily: 'RobotoSlab-Bold',
                      },
                    ]}>
                    Choose any 1 (Required)
                  </Text>

                  <View
                    style={{
                      alignSelf: 'flex-start',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        uncheckedColor="white"
                        color="red"
                        value="pepsi"
                        status={checked === 'pepsi' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({checked: 'pepsi'});
                          console.log(checked);
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'RobotoSlab-Bold',
                          color: 'white',
                        }}>
                        pepsi
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        uncheckedColor="white"
                        color="red"
                        value="7up"
                        status={checked === '7up' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.setState({checked: '7up'});
                          console.log(checked);
                        }}
                      />
                      <Text
                        style={[
                          styles.topLinksTxtColorChangeTop,
                          {
                            fontFamily: 'RobotoSlab-Bold',
                            fontSize: 12,
                            color: 'white',
                          },
                        ]}>
                        7up
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        uncheckedColor="white"
                        color="red"
                        value="Marinda"
                        status={
                          this.state.checked === 'Marinda'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => this.setState({checked: 'Marinda'})}
                      />
                      <Text
                        style={[
                          styles.topLinksTxtColorChangeTop,
                          {
                            fontSize: 12,
                            fontFamily: 'RobotoSlab-Bold',
                            color: 'white',
                          },
                        ]}>
                        Marinda
                      </Text>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            ) : null}
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({showCartModal: false});
          }}
          visible={this.state.showCartModal}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#000000aa',
            }}>
            <Animated.View
              style={
                (styles.containerr,
                {transform: [{scale: this.state.scaleValue}]})
              }>
              <View
                style={{
                  height: 150,
                  width: 250,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1A1E21',
                }}>
                <LottieView
                  style={{width: 140, height: 140}}
                  source={require('../../asserts/Animations/done.json')}
                  autoPlay
                  loop={false}
                />
              </View>
              <View
                style={{
                  width: 250,
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <Pressable style={{}} onPress={() => {}}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Item added to cart!
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.loginBtn,
                    {
                      width: '30%',
                      marginTop: '5%',
                      height: '20%',
                      backgroundColor: 'red',
                    },
                  ]}
                  onPress={() => {
                    this.setState({showCartModal: false});
                    this.props.navigation.navigate('Menu');
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '800',
                      color: 'white',
                    }}>
                    Ok
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </SafeAreaView>
        </Modal>
        <Modal
          animationType="none"
          transparent={true}
          onRequestClose={() => {
            this.setState({showImgModal: false});
          }}
          visible={this.state.showImgModal}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            <View
              style={{
                paddingTop: '10%',
                marginEnd: 5,
                alignSelf: 'flex-end',
              }}>
              <Pressable
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 22 / 2,
                  width: 22,
                  height: 22,
                }}
                onPress={() => {
                  this.setState({showImgModal: false});
                }}>
                <Entypo name={'cross'} size={22} color={'black'} />
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              {this.state.imgLoading ? (
                <Pinchable>
                  <FastImage
                    style={{alignSelf: 'center', width: '100%', height: '50%'}}
                    source={{
                      uri: Product.Img,
                    }}
                  />
                </Pinchable>
              ) : (
                <Image
                  onLoadStart={() => {
                    this.setState({imgLoading: true});
                  }}
                  onLoadEnd={() => {
                    this.setState({imgLoading: false});
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  source={require('../../asserts/Images/burger.png')}
                />
              )}
            </View>
          </SafeAreaView>
        </Modal>
        {Product.Type == 'AVAILABLE FOR DINE IN ONLY' ? null : (
          <Animatable.View
            style={{
              height: 85,
              position: 'absolute',
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('window').width,
              backgroundColor: '#FED116',
            }}
            // iterationCount={1}
            // useNativeDriver
            // animation={animation}
            // delay={duration}
          >
            <Pressable
              style={[
                styles.loginBtn,
                {width: '85%', marginBottom: 10, backgroundColor: '#DA2328'},
              ]}
              onPress={() => {
                this.props.addItemToCart(Product);
                this.setState({showCartModal: true});
                this.animateModal();
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}>
                ADD TO CART
              </Text>
            </Pressable>
          </Animatable.View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {reducer: state};
}

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: product => dispatch(addToCart(product)),
    removeItemFromCart: product => dispatch(removeFromCart(product)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
