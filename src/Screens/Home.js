import React, {Component, PureComponent} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  FlatList,
  Pressable,
  Modal,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Slideshow from 'react-native-image-slider-show';
import {SliderBox} from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {addToCart, removeFromCart} from '../Redux/Action/actions';
import BottomTabs from '../Components/BottomTabs/BottomTabs';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {Animations} from '../../Animations';
const ONE_SECOND_IN_MS = 1000;
const animation = {
  0: {opacity: 0, translateY: 70},
  1: {opacity: 1, translateY: 0},
};
const animations = Animations[Math.floor(Math.random() * Animations.length)];

const duration = 1;
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wait: true,
      showHome: true,
      showListtMenu: false,
      listt: [],
      fish: [],
      searchBarFocused: false,
      cartEmptyModal: false,
      images: [
        require('../asserts/Images/burgerDeal.jpeg'), // Local image
        require('../asserts/Images/fry.jpeg'), // Local image
        require('../asserts/Images/wing.jpeg'), // Loxcal image
      ],
    };
  }
  searchFlter = text => {
    const {listt, masterList} = this.state;
    if (text) {
      const filterArray = masterList.filter((item, i) => {
        const itemData = item.Title
          ? item.Title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({listt: filterArray});
    } else {
      this.setState({listt: masterList});
    }
  };

  listtFilter = () => {
    this.makeListtMenu();
    const {listt, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'fish') {
        return val;
      }
    });
    this.setState({listt: filterArray});
  };
  kidsFilter = () => {
    const {listt, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'kids') {
        return val;
      }
    });
    this.setState({listt: filterArray});
  };
  iceCreamShakeFilter = () => {
    const {listt, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'IceCreamShakes') {
        return val;
      }
    });
    this.setState({listt: filterArray});
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({wait: false});
    }, 3500);
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    var newArray = [];

    firestore()
      .collection('FeaturedDeals')
      .get()
      .then(querySnapshot => {
        console.log('Total FeaturedDeals: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New FeaturedDeals Push is =', newArray);
        this.setState({list: newArray, masterList: newArray});
      })
      .catch(error => {
        console.log(error);
      });
  };
  makeListtMenu = () => {
    var newArray = [];

    firestore()
      .collection('fishMenu')
      .get()
      .then(querySnapshot => {
        console.log('Total fishMenu: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({listt: newArray});
      })
      .catch(error => {
        console.log(error);
      });
  };
  renderFeaturDeals = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          alert(item.Title);
        }}
        style={{
          width: 185,
        }}>
        <View
          style={{
            marginBottom: '4%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#2C2C2C',
              marginTop: '5%',
              width: 170,
              height: 270,
            }}>
            {this.state.wait ? (
              <LottieView
                style={styles.lottie}
                source={require('../asserts/Animations/load.json')}
                autoPlay
                loop={true}
              />
            ) : (
              <Animatable.View
                iterationCount={1}
                useNativeDriver
                animation={'fadeIn'}
                delay={index * 300}
                style={{marginTop: '4%', alignItems: 'center'}}>
                <FastImage
                  style={{
                    borderRadius: 30,
                    padding: '1%',
                    width: 155,
                    height: 110,
                  }}
                  source={{uri: item.Img, priority: FastImage.priority.high}}
                />
              </Animatable.View>
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                paddingHorizontal: '8%',
                fontFamily: 'RobotoSlab-Bold',
              }}>
              {item.Title}
            </Text>
            <View
              style={{
                bottom: 40,
                position: 'absolute',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 18,
                  fontFamily: 'RobotoSlab-Bold',
                  paddingHorizontal: '8%',
                }}>
                {item.SubTitle}
              </Text>
            </View>
            <View
              style={{
                bottom: 13,
                position: 'absolute',
              }}>
              <Text
                style={{
                  paddingHorizontal: '8%',
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                PKR {item.Price}
              </Text>
            </View>
            <View
              style={[
                styles.cartBtnBlue,
                {
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  borderRadius: 100,
                  backgroundColor: 'black',
                  height: 57,
                  width: 57,
                },
              ]}>
              <View
                style={[
                  styles.cartBtnBlue,
                  {
                    flexDirection: null,
                    borderRadius: 100,
                    backgroundColor: '#DA2328',
                    height: 45,
                    width: 45,
                  },
                ]}>
                <Ionicons name="cart-sharp" size={22} color={'white'} />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  renderHome = () => {
    return (
      <View style={{}}>
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              backgroundColor: '#DA2328',
              paddingHorizontal: '2%',
              height: 90,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '95%',
              alignSelf: 'center',
            }}>
            <Pressable
              style={styles.cartBtnBlue}
              onPress={() => {
                if (this.state.searchBarFocused) {
                  this.props.navigation.navigate('Menu');
                } else {
                  this.props.navigation.toggleDrawer();
                }
              }}>
              <Ionicons
                name={this.state.searchBarFocused ? 'arrow-back' : 'menu'}
                size={22}
                color={'white'}
              />
            </Pressable>
            <Image
              style={{
                alignSelf: 'center',

                borderRadius: 10,
                width: 65,
                height: 80,
              }}
              source={require('../asserts/Images/howdy.jpeg')}
            />
            <Pressable
              style={styles.cartBtnBlue}
              onPress={() => {
                if (this.props.reducer.length < 1) {
                  this.setState({cartEmptyModal: true});
                } else {
                  this.props.navigation.navigate('Cart');
                }
              }}>
              <Ionicons name="cart-sharp" size={22} color={'white'} />
              {this.props.reducer.length > 0 ? (
                <Text
                  style={[
                    styles.topLinksTxtColorChangeTop,
                    {
                      fontWeight: '500',
                      fontSize: 12,
                      color: 'white',
                      marginTop: '-27%',
                    },
                  ]}>
                  {this.props.reducer.length}
                </Text>
              ) : null}
            </Pressable>
          </View>

          <View>
            <ScrollView
              contentContainerStyle={{marginTop: '2%'}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  this.listtFilter();
                }}>
                <Image source={require('../asserts/Images/fish.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/burger.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/milkshake.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/hot-beverage.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/beverage.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/dessert.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/fries.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/burrito.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image
                  source={require('../asserts/Images/chicken-wings.png')}
                />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/meat.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/chicken.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/sandwich.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/zinger.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/hamburger.png')} />
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Image source={require('../asserts/Images/appetizer.png')} />
              </Pressable>
            </ScrollView>
          </View>

          <SliderBox
            images={this.state.images}
            dotColor="#DFBC50"
            inactiveDotColor="#90A4AE"
            sliderBoxHeight={160}
            dotStyle={{}}
            autoplay
            circleLoop={true}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            ImageComponentStyle={{
              borderRadius: 19,
              width: '95%',
              marginTop: '8%',
            }}
          />

          <View
            style={{
              marginBottom: 14,
              paddingHorizontal: '3%',
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                transform: [{rotate: '7deg'}],
                marginTop: -7,
                width: 32,
                height: 32,
              }}
              tintColor="#DFBC50"
              source={require('../asserts/Images/favourites.png')}
            />
            <Text
              style={[
                styles.topLinksTxtColorChangeTop,
                {
                  marginTop: -3,
                  fontSize: 28,
                  fontFamily: 'Rustler',
                  marginLeft: -6,
                  color: 'white',
                },
              ]}>
              FEATURED DEALS
            </Text>
          </View>
          <View style={{paddingHorizontal: '2%'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              renderItem={this.renderFeaturDeals}
              extraData={this.state.list}
              keyExtractor={item => item.key}
            />
          </View>
          <View
            style={{
              marginBottom: 14,
              marginTop: 30,
              paddingHorizontal: '3%',
              flexDirection: 'row',
              alignSelf: 'flex-start',
              justifyContent: 'center',
            }}>
            <Image
              tintColor="#DFBC50"
              style={{
                transform: [{rotate: '7deg'}],
                marginTop: -3,
                width: 32,
                height: 32,
              }}
              source={require('../asserts/Images/favourites.png')}
            />
            <View
              style={{
                justifyContent: 'center',
                marginLeft: -7,
                flexDirection: 'column',
              }}>
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontSize: 28,
                    fontFamily: 'Rustler',
                    color: 'white',
                  },
                ]}>
                THERE ARE TWO TYPES OF
              </Text>
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontSize: 28,
                    fontFamily: 'Rustler',

                    color: 'white',
                  },
                ]}>
                PEOPLE
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              renderItem={this.renderFeaturDeals}
              keyExtractor={item => item.key}
            />
          </View>
          <View
            style={{
              marginBottom: 14,
              marginTop: 30,
              paddingHorizontal: '3%',
              flexDirection: 'row',
              alignSelf: 'flex-start',
              justifyContent: 'center',
            }}>
            <Image
              tintColor="#DFBC50"
              style={{
                width: 32,
                height: 32,
                marginTop: -3,
                transform: [{rotate: '7deg'}],
              }}
              source={require('../asserts/Images/favourites.png')}
            />
            <View
              style={{
                justifyContent: 'center',
                marginLeft: -3,
                flexDirection: 'column',
              }}>
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontSize: 28,
                    fontFamily: 'Rustler',
                    marginLeft: -6,
                    color: 'white',
                  },
                ]}>
                APPETIZERS THE
              </Text>
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontSize: 28,
                    fontFamily: 'Rustler',
                    color: 'white',
                  },
                ]}>
                TANTALIZERS
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              renderItem={this.renderFeaturDeals}
              keyExtractor={item => item.key}
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  listtHeader = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            backgroundColor: '#DA2328',
            paddingHorizontal: '2%',
            height: 90,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: Dimensions.get('window').width,
          }}>
          <View style={styles.cartBtnBlue}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.searchBarFocused) {
                  this.props.navigation.navigate('Menu');
                } else {
                  this.props.navigation.toggleDrawer();
                }
              }}>
              <Ionicons
                name={this.state.searchBarFocused ? 'arrow-back' : 'menu'}
                size={22}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={{
              alignSelf: 'center',
              width: 65,
              borderRadius: 10,
              height: 80,
            }}
            source={require('../asserts/Images/howdy.jpeg')}
          />
          <TouchableOpacity
            style={styles.cartBtnBlue}
            onPress={() => {
              if (this.props.reducer.length < 1) {
                this.setState({cartEmptyModal: true});
              } else {
                this.props.navigation.navigate('Cart');
              }
            }}>
            <Ionicons name="cart-sharp" size={22} color={'white'} />
            {this.props.reducer.length > 0 ? (
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {
                    fontWeight: '500',
                    fontSize: 12,
                    color: 'white',
                    marginTop: '-27%',
                  },
                ]}>
                {this.props.reducer.length}
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            contentContainerStyle={{}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.setState({showListtMenu: true, showHome: false});
              }}>
              <Image source={require('../asserts/Images/fish.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/burger.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/milkshake.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/hot-beverage.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/beverage.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/dessert.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/fries.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/burrito.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/chicken-wings.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/meat.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/chicken.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/sandwich.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/zinger.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/hamburger.png')} />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Image source={require('../asserts/Images/appetizer.png')} />
            </Pressable>
          </ScrollView>
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={require('../asserts/Images/searchh.png')}
            style={styles.imageStyle}
          />
          <TextInput
            onChangeText={text =>
              this.setState({textInputText1: text}, this.searchFlter(text))
            }
            style={{flex: 1}}
            placeholder="Search your favourites"
            placeholderTextColor="grey"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  };
  listtMenu = () => {
    return (
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={this.state.listt}
        renderItem={this.renderListtMenu}
        ListHeaderComponent={this.listtHeader}
        keyExtractor={item => item.key}
      />
    );
  };
  renderListtMenu = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          width: Dimensions.get('window').width / 2,
        }}>
        <View
          style={{
            marginBottom: '4%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#2C2C2C',
              marginTop: '5%',
              width: '90%',
              height: 290,
            }}>
            <View
              style={{
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  borderRadius: 30,
                  marginBottom: 10,
                  width: 140,
                  height: 120,
                }}
                source={require('../asserts/Images/food.png')}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginBottom: '7%',
                paddingHorizontal: '8%',
                fontWeight: '700',
              }}>
              {item.Title}
            </Text>
            <View
              style={{
                bottom: 55,
                position: 'absolute',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  paddingHorizontal: '8%',
                }}>
                {item.SubTitle}
              </Text>
            </View>
            <View
              style={{
                bottom: 27,
                position: 'absolute',
              }}>
              <Text
                style={{
                  paddingHorizontal: '8%',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                PKR {item.Price}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                this.props.addItemToCart(item);
              }}
              style={[
                styles.cartBtnBlue,
                {
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  borderRadius: 100,
                  backgroundColor: 'black',
                  height: 57,
                  width: 57,
                },
              ]}>
              <View
                style={[
                  styles.cartBtnBlue,
                  {
                    flexDirection: null,
                    borderRadius: 100,
                    backgroundColor: '#DA2328',
                    height: 45,
                    width: 45,
                  },
                ]}>
                <Ionicons name="cart-sharp" size={22} color={'white'} />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };
  renderKidsMenu = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          width: Dimensions.get('window').width / 2,
        }}>
        <View
          style={{
            marginBottom: '4%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: '#272E32',
              marginTop: '5%',
              width: '90%',
              height: 290,
            }}>
            <View
              style={{
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  borderRadius: 30,
                  marginBottom: 10,
                  width: 140,
                  height: 120,
                }}
                source={require('../asserts/Images/food.png')}
              />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginBottom: '7%',
                paddingHorizontal: '8%',
                fontWeight: '700',
              }}>
              {item.Title}
            </Text>
            <View
              style={{
                bottom: 55,
                position: 'absolute',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  paddingHorizontal: '8%',
                }}>
                {item.SubTitle}
              </Text>
            </View>
            <View
              style={{
                bottom: 27,
                position: 'absolute',
              }}>
              <Text
                style={{
                  paddingHorizontal: '8%',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                PKR {item.Price}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                this.props.addItemToCart(item);
              }}
              style={[
                styles.cartBtnBlue,
                {
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  borderRadius: 100,
                  backgroundColor: 'black',
                  height: 57,
                  width: 57,
                },
              ]}>
              <View
                style={[
                  styles.cartBtnBlue,
                  {
                    flexDirection: null,
                    borderRadius: 100,
                    backgroundColor: '#DA2328',
                    height: 45,
                    width: 45,
                  },
                ]}>
                <Ionicons name="cart-sharp" size={22} color={'white'} />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };
  // kidsMenu = () => {
  //   return (
  //     <FlatList
  //       numColumns={2}
  //       showsHorizontalScrollIndicator={false}
  //       data={this.state.kids}
  //       ListHeaderComponent={this.kidsHeader}
  //       renderItem={this.renderKidsMenu}
  //       keyExtractor={item => item.key}
  //     />
  //   );
  // };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />

        {this.state.showHome ? <View>{this.renderHome()}</View> : null}
        {this.state.showListtMenu ? (
          <View style={{flex: 1}}>{this.listtMenu()}</View>
        ) : null}

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
                  source={require('../asserts/Animations/alert.json')}
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
        {/* <BottomTabs navigation={this.props.navigation} /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  sectionStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 44,
    width: '60%',
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: '#DCDCDC',
    marginTop: 20,
  },
  button: {
    height: 55,
    width: 55,
    shadowColor: '#000',
    backgroundColor: '#FED116',
    margin: 10,
    marginBottom: 20,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    padding: '3%',
    margin: '5%',
    tintColor: 'grey',
    height: 19,
    width: 19,
  },
  textLinks: {
    paddingHorizontal: '5%',
    color: 'black',
    marginTop: '8%',
    fontSize: 10,
  },
  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
  },
  exchangeTxt: {
    paddingHorizontal: '5%',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  london: {
    marginLeft: '1%',
    fontSize: 14,
    marginRight: '4%',
    color: 'black',
  },
  socialIcon: {
    marginRight: '3%',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    borderWidth: 0.5,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTwo: {
    marginTop: '8%',
    margin: '8%',
    width: 55,
    height: 50,
  },
  MenuBtn: {
    flexDirection: 'row',
    width: '12%',
    height: 28,
    marginRight: '2%',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'pink',
  },

  input: {
    borderWidth: 0.3,
    width: 200,
    height: 35,
    borderRadius: 50,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllBtnContainer: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cartBtn: {
    marginRight: '3%',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBtnBlue: {
    flexDirection: 'row',
    width: '10%',
    borderRadius: 12,
    width: '10%',
    height: 37,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  threeBtns: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  loginBtn: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopLinksBtns: {
    width: '25%',
    height: 35,
    marginRight: '3%',

    backgroundColor: '#0062AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnBlue: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopLinks: {
    color: 'black',
    fontSize: 14,
  },
  topLinksTxtColorChange: {
    color: 'white',
    fontSize: 14,
  },
  displayNameIcons: {
    width: '14%',
    height: 45,
    marginRight: '3%',
    borderRadius: 8,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  happCustomerContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  happCustomerComponents: {
    flexDirection: 'column',
    borderColor: 'grey',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminPanelBtn: {
    width: '30%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminPanelBlue: {
    width: '30%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topthreeBtnColor: {
    color: '#0062AB',
    fontSize: 14,
  },
  topthreeBtnColorChange: {
    color: 'white',
    fontSize: 14,
  },
  SerchBtn: {
    width: '12%',
    height: 28,
    borderWidth: 0.5,
    borderColor: 'pink',
    justifyContent: 'center',
    marginRight: '2%',
    alignItems: 'center',
  },
  container: {backgroundColor: '#1A1E21', flex: 1},
  lottie: {
    marginTop: '4%',
    alignSelf: 'center',
    width: 90,
    height: 90,
  },
});
