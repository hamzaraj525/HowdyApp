import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  Alert,
  Modal,
  View,
  StatusBar,
  Pressable,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const newReference = database().ref('/cartItems').push();

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showMinimumModal: false,
      showDeleteConfirm: false,
      showConfirmOrderModal: false,
      postTime: firestore.Timestamp.fromDate(new Date()),
    };
  }

  addToRealTimeDatabase = () => {
    const idd = Math.floor(Math.random() * 1999 + 20000);
    newReference
      .set({
        id: newReference.key,
        Order: this.props.reducer,
        OrderTime: new Date().toLocaleString(),
      })
      .then(() => {
        this.setState({showConfirmOrderModal: true});
      })
      .catch(error => {
        // console.log(error);
        Alert.alert('Your Network Connection Is Not Good');
      });
  };

  renderList = reducer => {
    return this.props.reducer.map((item, index) => {
      return (
        <View key={index} onPress={() => {}} style={style.cartItemsContainer}>
          <FastImage
            style={style.cartItemImage}
            source={{
              uri: item.Img,
              priority: FastImage.priority.high,
            }}
          />
          {/* {console.warn(this.props, 'props and data')} */}
          <View
            style={{position: 'absolute', left: 140, flexDirection: 'column'}}>
            <Text style={style.cartItemTitle}>{item.Title}</Text>
            <Text style={style.cartItemPrice}>PKR {item.Price}</Text>
            <Pressable
              onPress={() => {
                this.props.removeItemFromCart(item);
              }}>
              <Text style={style.cartRemoveTxt}>Remove</Text>
              <View
                style={{
                  width: 57,
                  height: 0.9,
                  marginTop: -2,
                  backgroundColor: '#DA2328',
                }}
              />
            </Pressable>
          </View>
          <View style={{}}>
            <View style={style.plusContainer}>
              <Pressable onPress={() => {}} style={style.plusbtn}>
                <AntDesign name={'plus'} size={22} color={'black'} />
              </Pressable>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 20,
                  color: 'white',
                }}>
                {this.props.reducer.length}
              </Text>

              <Pressable onPress={() => {}} style={style.minusBtn}>
                <AntDesign name={'minus'} size={22} color={'white'} />
              </Pressable>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    const items = this.props.reducer;
    // const total = 200;
    const total = items
      .map(item => Number(item.Price))
      .reduce((prev, curr) => prev + curr, 0);
    const TotalPKR = total.toFixed(2);

    var percent = (16 / 100) * TotalPKR;

    const GSTTotal = percent.toFixed(2);
    const Total = (total + percent).toFixed(2);
    const TotalUSD = total.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
    });
    // console.log(TotalPKR);

    return (
      <SafeAreaView style={{backgroundColor: '#1A1E21', flex: 1}}>
        <StatusBar hidden={true} />
        <ScrollView style={{}}>
          <View style={[style.containerrr, {width: 500, height: 110}]}>
            <View style={[style.background, {backgroundColor: 'blue'}]}>
              <View
                style={[
                  style.image,
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
                <View style={style.cartBtnBlue}>
                  <Pressable
                    onPress={() => {
                      this.props.navigation.goBack(null);
                    }}>
                    <Ionicons name={'arrow-back'} size={22} color={'white'} />
                  </Pressable>
                </View>
                <Text style={{fontWeight: '700', color: 'white', fontSize: 27}}>
                  MY CART
                </Text>
                <Pressable
                  style={style.cartBtnBlue}
                  onPress={() => {
                    this.setState({showDeleteConfirm: true});
                  }}>
                  <AntDesign name="delete" size={22} color={'white'} />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{marginTop: '-10%'}}>{this.renderList()}</View>
        </ScrollView>

        <View style={{flex: 1}}>
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
              this.setState({showMinimumModal: false});
            }}
            visible={this.state.showMinimumModal}>
            <SafeAreaView style={style.showminimumModal}>
              <View style={style.containerr}>
                <View style={style.showminimumModalInner}>
                  <LottieView
                    style={{width: 90, height: 90}}
                    source={require('../../asserts/Animations/crosss.json')}
                    autoPlay
                    loop={false}
                  />
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      paddingHorizontal: '5%',
                      fontSize: 16,
                    }}>
                    Minimum Spend should be
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      paddingHorizontal: '5%',
                      fontSize: 16,
                    }}>
                    of PKR 500
                  </Text>

                  <Pressable
                    style={[
                      style.loginBtn,
                      {
                        width: '30%',
                        marginTop: '5%',
                        height: '20%',
                        backgroundColor: 'red',
                      },
                    ]}
                    onPress={() => {
                      this.setState({showMinimumModal: false});
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
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({showConfirmOrderModal: false});
          }}
          visible={this.state.showConfirmOrderModal}>
          <SafeAreaView style={style.showconfirmOrderModal}>
            <View style={style.showconfirmOrderModalInner}>
              <View
                style={{
                  position: 'absolute',
                  right: 2,
                  top: 2,
                  padding: '2%',
                }}>
                <Pressable
                  onPress={() => {
                    this.setState({
                      showConfirmOrderModal: false,
                      reducer: (this.props.reducer.length = 0),
                    });
                    this.props.navigation.navigate('Menu');
                  }}>
                  <Entypo name={'cross'} size={32} color={'black'} />
                </Pressable>
              </View>

              <LottieView
                style={{marginTop: 10, width: 120, height: 120}}
                source={require('../../asserts/Animations/done.json')}
                autoPlay
                loop={false}
              />

              <Text
                style={[
                  style.textHeader,
                  {fontSize: 21, marginTop: 15, fontWeight: '700'},
                ]}>
                Thank you for placing order
              </Text>

              <View
                style={{
                  marginTop: 10,
                  height: 0.8,
                  width: '80%',
                  backgroundColor: 'red',
                }}
              />
              <Text
                style={[
                  style.textHeader,
                  {marginTop: 10, fontWeight: '400', color: '#DA2328'},
                ]}>
                Your Order Id is
              </Text>
              <Text
                style={[
                  style.textHeader,
                  {
                    marginBottom: 10,
                    fontWeight: '400',
                    marginTop: 10,
                    color: '#DA2328',
                  },
                ]}>
                {newReference.key}
              </Text>
              <View
                style={{
                  marginBottom: 90,
                  height: 0.8,
                  width: '80%',
                  backgroundColor: 'red',
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            this.setState({showDeleteConfirm: false});
          }}
          visible={this.state.showDeleteConfirm}>
          <TouchableOpacity
            style={style.showdeleteConfirm}
            activeOpacity={1}
            onPress={() => {
              this.setState({showDeleteConfirm: false});
            }}>
            <View style={style.showdeleteConfirmInner}>
              <Text style={[style.textHeader, {color: 'white'}]}>
                This will empty your cart
              </Text>

              <Pressable
                style={[
                  style.loginBtn,
                  {
                    alignSelf: 'center',
                    borderRadius: 0,
                    borderWidth: 2,
                    borderColor: 'white',
                    width: '70%',
                    backgroundColor: '#DA2328',
                  },
                ]}
                onPress={() => {
                  this.setState({
                    reducer: (this.props.reducer.length = null),
                  });
                  this.setState({showDeleteConfirm: false});
                  this.props.navigation.navigate('Menu');
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: 'white',
                  }}>
                  Proceed
                </Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={{}}>
          <View style={style.totalContainer}>
            <View style={style.subtotalContainer}>
              <Text style={style.title}>SubTotal</Text>
              <Text style={style.titlee}>PKR {TotalPKR}</Text>
            </View>
            <View style={style.gstContainer}>
              <Text style={style.title}>GST 16%</Text>
              <Text style={style.titlee}>PKR {GSTTotal}</Text>
            </View>

            <View style={style.TotalContainer}>
              <Text style={style.title}>Total</Text>
              <Text style={style.titlee}>PKR {Total}</Text>
            </View>
            <View style={{}}>
              <Text style={style.title}>Minimum order limit is PKR 500</Text>
            </View>
          </View>

          <View style={style.checkoutbtn}>
            <Pressable
              style={[
                style.loginBtn,
                {
                  marginBottom: 10,
                  width: '85%',
                  backgroundColor: '#DA2328',
                },
              ]}
              onPress={() => {
                if (Total < 500) {
                  this.setState({showMinimumModal: true});
                } else {
                  this.addToRealTimeDatabase();
                }
              }}>
              <Text style={style.proceedtxt}>Proceed to checkout</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {reducer: state.reducers.cartReducer.cartItems};
};
function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: product => dispatch(addToCart(product)),
    removeItemFromCart: product => dispatch(removeFromCart(product)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
