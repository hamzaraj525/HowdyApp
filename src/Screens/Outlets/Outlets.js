import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  Linking,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import style from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Outlets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Outlets: [],
    };
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <StatusBar hidden={true} />

        <View>
          <View style={style.parent}>
            <View style={style.cartBtnBlue}>
              <Pressable
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={22} color={'white'} />
              </Pressable>
            </View>
            <Text style={style.ouletTxt}>OUTLETS</Text>
            <Text style={style.ouTxt}>out</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={style.outletContain}
            contentContainerStyle={{
              alignItems: 'center',
            }}>
            <Text style={style.location}>MM Alam Road</Text>

            <Image
              style={style.img}
              source={require('../../asserts/Images/logo.jpeg')}
            />

            <View style={style.contactContain}>
              <Ionicons name="call" size={22} color={'black'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                  fontSize: 15,
                }}>
                03230006002
              </Text>
            </View>

            <Text style={style.address}>Near Faraz Manan Boutique</Text>
            <Text style={[style.address, {marginTop: 5}]}>Lahore</Text>

            <Pressable
              onPress={() => {
                Linking.openURL(
                  'https://www.google.com/maps/place/Howdy+Rooftop+MM+Alam/@31.5106392,74.3482405,17z/data=!3m1!4b1!4m5!3m4!1s0x391904f88558b015:0x1b80f2615018325c!8m2!3d31.5106392!4d74.3504292',
                );
              }}
              style={style.mapBtn}>
              <Ionicons name="location-sharp" size={22} color={'white'} />
              <Text style={style.getdirecTxt}>Get Directions</Text>
            </Pressable>

            <Pressable
              style={style.loginBtn}
              onPress={() => {
                Linking.openURL(`tel:${'03230006002'}`);
              }}>
              <Ionicons name="call" size={22} color={'black'} />
              <Text style={style.callTxt}>Call Us</Text>
            </Pressable>
          </ScrollView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={style.outletContain}
            contentContainerStyle={{
              alignItems: 'center',
            }}>
            <Text style={style.location}>Johar Town</Text>

            <Image
              style={style.img}
              source={require('../../asserts/Images/logo.jpeg')}
            />

            <View style={style.contactContain}>
              <Ionicons name="call" size={22} color={'black'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                  fontSize: 15,
                }}>
                03164558585
              </Text>
            </View>

            <Text style={style.address}>Near Bundu Khan Restaurant</Text>
            <Text style={[style.address, {marginTop: 5}]}>Lahore</Text>

            <Pressable
              onPress={() => {
                Linking.openURL(
                  'https://www.google.com/maps/place/Howdy+Johar+Town/@31.4500389,74.2687616,17z/data=!3m1!4b1!4m5!3m4!1s0x39190176ccdebbe5:0x1001a09e03ec1fda!8m2!3d31.4500551!4d74.2708825',
                );
              }}
              style={[style.mapBtn, {marginTop: 24}]}>
              <Ionicons name="location-sharp" size={22} color={'white'} />
              <Text style={style.getdirecTxt}>Get Directions</Text>
            </Pressable>

            <Pressable
              style={style.loginBtn}
              onPress={() => {
                Linking.openURL(`tel:${'03164558585'}`);
              }}>
              <Ionicons name="call" size={22} color={'black'} />
              <Text style={style.callTxt}>Call Us</Text>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
