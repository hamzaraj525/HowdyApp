import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
class BottomTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {cartEmptyModal: false, fontSizeChange: false};
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <SafeAreaView
          style={{
            width: Dimensions.get('window').width,
            height: 30,
            borderRadius: Dimensions.get('window').width / 2,
            backgroundColor: 'blue',
            // backgroundColor: 'transparent',
          }}
        /> */}

        <SafeAreaView style={styles.bottomBarContainer}>
          <Pressable
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            style={{
              marginBottom: 12,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                marginBottom: 5,
                tintColor: '#1A1E21',
                width: 25,
                height: 25,
              }}
              source={require('../../asserts/Images/home.png')}
            />

            <Text style={{alignSelf: 'center', color: '#DA2328', fontSize: 12}}>
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              this.props.navigation.navigate('Outlets');
            }}
            style={{
              marginBottom: 12,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                marginBottom: 5,
                tintColor: '#DA2328',
                alignSelf: 'center',
                width: 25,
                height: 25,
              }}
              source={require('../../asserts/Images/pin.png')}
            />
            <Text style={{alignSelf: 'center', color: '#DA2328', fontSize: 12}}>
              Outlets
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              this.props.navigation.navigate('Menu');
            }}
            style={[
              styles.cartBtnBlue,
              {
                marginBottom: 14,
                borderRadius: 100,
                backgroundColor: '#1A1E21',
                height: 75,
                width: 75,
                marginTop: -24,
              },
            ]}>
            <View
              style={[
                styles.cartBtnBlue,
                {
                  borderRadius: 100,
                  backgroundColor: '#DA2328',
                  height: 53,
                  width: 53,
                },
              ]}>
              <Image
                style={{
                  width: 38,
                  height: 38,
                  tintColor: 'white',
                }}
                source={require('../../asserts/Images/menu.png')}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              if (this.props.reducer.length < 1) {
                this.setState({cartEmptyModal: true});
              } else {
                this.props.navigation.navigate('Cart');
              }
            }}
            style={{
              marginBottom: 12,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                marginBottom: 5,
                tintColor: '#DA2328',
                width: 25,
                height: 25,
              }}
              source={require('../../asserts/Images/shop.png')}
            />
            <Text style={{alignSelf: 'center', color: '#DA2328', fontSize: 12}}>
              Cart
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              this.props.navigation.navigate('AuthStack');
            }}
            style={{
              marginBottom: 12,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                marginBottom: 5,
                width: 25,
                height: 25,
                borderRadius: 30 / 2,
              }}
              source={require('../../asserts/Images/howdy.jpeg')}
            />
            <Text style={{alignSelf: 'center', color: '#DA2328', fontSize: 12}}>
              Settings
            </Text>
          </Pressable>
        </SafeAreaView>

        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({cartEmptyModal: false});
          }}
          visible={this.state.cartEmptyModal}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#000000aa',
            }}>
            <View style={styles.containerr}>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1A1E21',
                }}>
                <LottieView
                  style={{width: 140, height: 140}}
                  source={require('../../asserts/Animations/alert.json')}
                  autoPlay
                  loop={false}
                />
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <Pressable style={{}} onPress={() => {}}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Cart is Empty
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
                    this.setState({cartEmptyModal: false});
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
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {reducer: state};
}

export default connect(mapStateToProps, null)(BottomTabs);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FED116',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
  },
  bottomBarContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FED116',
    paddingHorizontal: '5%',
    paddingVertical: '1.9%',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
  cartBtnBlue: {
    width: '10%',
    borderRadius: 100,
    height: 45,
    width: 45,
    backgroundColor: '#DA2328',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
