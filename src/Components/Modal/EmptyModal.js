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

export default class EmptyModal extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {cartEmptyModal} = this.props;
    return (
      <SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({cartEmptyModal: false});
          }}
          visible={cartEmptyModal}>
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
