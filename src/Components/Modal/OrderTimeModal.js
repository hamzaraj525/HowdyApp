import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
export default class OrderTimeModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: moment().format('dddd'),
    };
  }
  render() {
    const {showModal} = this.props;
    return (
      <SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({showModal: false});
          }}
          visible={showModal}>
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
                  style={{width: 80, height: 80}}
                  source={require('../../asserts/Animations/crosss.json')}
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
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Online Orders are not
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  available at the moment.
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Order placing hours for
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  {this.state.day} are
                </Text>
                {this.state.day == 'Saturday' ? (
                  <Text
                    style={{
                      marginTop: '5%',
                      color: 'black',
                      fontSize: 15,
                    }}>
                    12:00pm - 2:00am
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginTop: '5%',
                      color: 'black',
                      fontSize: 15,
                    }}>
                    12:00pm - 12:30am
                  </Text>
                )}

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
                    this.setState({showModal: false});
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
