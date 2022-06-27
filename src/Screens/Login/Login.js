import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import style from './style';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailPlaceHolder: '',
      passwordPlaceHolder: '',
    };
  }

  LogIn = (email, password) => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.props.navigation.navigate('Home');
          })
          .then(() => {
            this.setState({email: '', password: ''});
          })
          .then(() => {
            alert('succesfully Signes In');
          })

          .catch(error => {
            if (error.code === 'auth/weak-password') {
              alert('The password is too weak.');
            }
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('That password is invalid!');
            }
          });
      } else {
        this.snackbar();
      }
    } else {
      this.snackbar();
    }
  };

  snackbar = () => {
    Snackbar.show({
      textColor: 'white',
      backgroundColor: '#DA2328',
      text: 'Select Minimum Required Item',
      duration: Snackbar.LENGTH_SHORT,
    });
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
            <Text style={style.signUpTxt}>LOGIN</Text>

            <View style={style.passwordContainer}>
              <Ionicons name="mail-outline" size={20} color={'black'} />
              <TextInput
                style={style.TiName}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                onFocus={() =>
                  this.setState({
                    emailPlaceHolder: true,
                    passwordPlaceHolder: false,
                  })
                }
                placeholder={
                  this.state.emailPlaceHolder ? 'Enter your email' : 'Email'
                }
                placeholderTextColor={
                  this.state.emailPlaceHolder ? 'black' : 'grey'
                }
              />
            </View>

            <View style={[style.passwordContainer, {}]}>
              <Feather name="lock" size={20} color={'black'} />
              <TextInput
                style={style.TiName}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                onFocus={() =>
                  this.setState({
                    passwordPlaceHolder: true,
                    emailPlaceHolder: false,
                  })
                }
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

            <Pressable
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              <Text style={style.forpasword}>Forgot Password ?</Text>
              <View style={style.line} />
            </Pressable>

            <Pressable
              onPress={() => {
                this.LogIn(this.state.email, this.state.password);
              }}
              style={style.loginBtn}>
              <Text style={style.sinupBtn}>LOGIN</Text>
              <Ionicons name={'arrow-forward'} size={22} color={'white'} />
            </Pressable>
          </View>

          <View style={{marginTop: '21%'}}>
            <View style={style.joinUsContainer}>
              <>
                <Text style={{fontFamily: 'RobotoSlab-Bold', color: 'white'}}>
                  Or join using
                </Text>
              </>
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
              <Text style={style.txtAlready}>Dont have an account?</Text>
              <Pressable
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={style.logintXT}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
