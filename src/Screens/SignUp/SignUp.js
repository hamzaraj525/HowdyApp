import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: '',
      email: '',
      password: '',
      contact: '',
      call: '',
      city: '',
      mailPlaceHolder: false,
      personPlaceHolder: false,
      passwordPlaceHolder: false,
      contactPlaceHolder: false,

      cities: [
        {key: 0, city: 'Lahore'},
        {key: 1, city: 'Karachi'},
        {key: 2, city: 'Islamabad'},
      ],
      pickerModal: false,
    };
  }

  renderCities = () => {
    return this.state.cities.map(item => {
      return (
        <Pressable
          onPress={() => {
            this.setState({city: item.city});
            this.setState({pickerModal: false});
          }}
          key={item.key}
          style={{padding: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={style.cityTxt}>{item.city}</Text>
        </Pressable>
      );
    });
  };

  SignUp = (email, password) => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            alert(' Succesfully signed Up!');
          })
          .then(() => {
            this.props.navigation.navigate('Login');
          })
          .then(() => {
            this.setState({email: '', password: ''});
          })
          .catch(error => {
            if (error.code === 'auth/weak-password') {
              alert('The password is too weak.');
            }
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('That password is weak!');
            }
          });
      } else {
        alert('password empty');
      }
    } else {
      alert('email empty');
    }
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <StatusBar hidden={true} />
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? `60` : 0}> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.parentContainer}>
            <View style={style.cartBtnBlue}>
              <Pressable
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={22} color={'white'} />
              </Pressable>
            </View>
            <Image
              style={style.img}
              source={require('../../asserts/Images/howdy.jpeg')}
            />
            <Text style={style.outTxt}>out</Text>
          </View>
          <View
            style={{
              marginTop: '20%',
              alignItems: 'center',
            }}>
            <Text style={style.signUpTxt}>SIGN UP</Text>

            <View style={style.passwordContainer}>
              <Ionicons name="person" size={20} color={'black'} />
              <TextInput
                style={style.TiName}
                value={this.state.person}
                onChangeText={person => this.setState({person})}
                onFocus={() => this.setState({personPlaceHolder: true})}
                placeholder={
                  this.state.personPlaceHolder ? 'Enter your name' : 'Name'
                }
                placeholderTextColor={
                  this.state.personPlaceHolder ? 'black' : 'grey'
                }
              />
            </View>

            <View style={style.passwordContainer}>
              <Ionicons name="mail-outline" size={20} color={'black'} />
              <TextInput
                onFocus={() =>
                  this.setState({
                    personPlaceHolder: false,
                    mailPlaceHolder: true,
                  })
                }
                style={style.TiName}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                placeholder={
                  this.state.mailPlaceHolder ? 'Enter your email' : 'Email'
                }
                placeholderTextColor={
                  this.state.mailPlaceHolder ? 'black' : 'grey'
                }
              />
            </View>
            <View style={[style.passwordContainer, {}]}>
              <Feather name="lock" size={20} color={'black'} />
              <TextInput
                secureTextEntry
                onFocus={() =>
                  this.setState({
                    passwordPlaceHolder: true,
                    mailPlaceHolder: false,
                    personPlaceHolder: false,
                  })
                }
                style={style.TiName}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                placeholder={
                  this.state.passwordPlaceHolder
                    ? 'Enter your password'
                    : 'Password'
                }
                placeholderTextColor={
                  this.state.passwordPlaceHolder ? 'black' : 'grey'
                }
              />
            </View>
            <View style={style.passwordContainer}>
              <Ionicons name="call-outline" size={20} color={'black'} />
              <TextInput
                onFocus={() =>
                  this.setState({
                    personPlaceHolder: false,
                    mailPlaceHolder: false,
                    passwordPlaceHolder: false,
                    contactPlaceHolder: true,
                  })
                }
                style={style.TiName}
                value={this.state.contact}
                onChangeText={contact => this.setState({contact})}
                placeholder={
                  this.state.contactPlaceHolder
                    ? 'Enter your contact'
                    : 'Contact'
                }
                placeholderTextColor={
                  this.state.contactPlaceHolder ? 'black' : 'grey'
                }
              />
            </View>

            <Pressable
              style={style.sectionStyle}
              onPress={() => {
                this.setState({pickerModal: true});
              }}>
              <View pointerEvents="none">
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'RobotoSlab-Bold',
                    fontSize: 13,
                  }}>
                  {this.state.city ? this.state.city : 'Select City'}
                </Text>
              </View>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                size={20}
                color={'black'}
              />
            </Pressable>

            <Pressable
              onPress={() => this.SignUp(this.state.email, this.state.password)}
              style={[
                style.loginBtn,
                {
                  width: '80%',
                  flexDirection: 'row',
                  backgroundColor: '#DA2328',
                },
              ]}>
              <Text style={style.sinupBtn}>SIGNUP</Text>
              <Ionicons name={'arrow-forward'} size={22} color={'white'} />
            </Pressable>
          </View>
          <View style={{marginTop: '21%'}}>
            <View style={style.joinUsContainer}>
              <View style={{}}>
                <Text style={{fontFamily: 'RobotoSlab-Bold', color: 'white'}}>
                  Or join using
                </Text>
              </View>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Pressable>
                  <Image
                    style={style.SocialImg}
                    source={require('../../asserts/Images/fb.png')}
                  />
                </Pressable>
                <Pressable>
                  <Image
                    style={style.SocialImg}
                    source={require('../../asserts/Images/g.png')}
                  />
                </Pressable>
              </View>
            </View>

            <View style={style.alreadytxtContainer}>
              <Text style={style.txtAlready}>Already have account ?</Text>
              <Pressable
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={style.logintXT}>Login</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
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
            <View style={style.containerr}>
              <Pressable
                style={{}}
                onPress={() => {
                  this.setState({pickerModal: false});
                }}>
                <ScrollView
                  contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  showsHorizontalScrollIndicator={false}>
                  {this.renderCities()}
                </ScrollView>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    );
  }
}
