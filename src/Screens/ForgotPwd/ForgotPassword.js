import React, {PureComponent} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import style from './style';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Svg, Image, Circle, ClipPath} from 'react-native-svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
export default class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {email: '', emailPlaceHolder: ''};
  }

  LogIn = (email, password) => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.props.navigation.navigate('Cart');
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
        alert('password empty');
      }
    } else {
      alert('email empty');
    }
  };

  snackbar = () => {
    Snackbar.show({
      textColor: 'white',
      backgroundColor: '#DA2328',
      text: 'Email is required',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  forgotPassword = email => {
    if (this.state.email.length > 0) {
      auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          alert('Reset email has sent to your Mail...');
        })
        .catch(function (e) {
          alert(
            'You Can Not Reset Your Passwoord Because There Is No Record Found Of This Email Adress',
            e,
          );
        });
    } else {
      this.snackbar();
    }
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <StatusBar hidden={true} />
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? `60` : 0}> */}

        <Svg height={100} width={width}>
          <ClipPath id="clip">
            <Circle r={100} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('../../asserts/Images/wall.jpg')}
            height={100}
            width={width}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
          <View style={style.parent}>
            <View style={style.cartBtnBlue}>
              <Pressable
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={22} color={'white'} />
              </Pressable>
            </View>
            <Text style={style.fpTxt}>FORGOT PASSWORD</Text>
            <Text style={style.outTxt}>out</Text>
          </View>
        </Svg>

        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: '20%',
              alignItems: 'center',
            }}>
            <View style={style.passwordContainer}>
              <Ionicons name="mail-outline" size={20} color={'black'} />
              <TextInput
                style={style.Ti}
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

            <Pressable
              onPress={() => {
                this.forgotPassword(this.state.email, this.state.password);
              }}
              style={style.loginBtn}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}>
                Submit
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}
