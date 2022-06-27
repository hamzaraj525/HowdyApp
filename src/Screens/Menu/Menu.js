import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  Dimensions,
  View,
  FlatList,
  ScrollView,
  Vibration,
  Pressable,
  Animated,
} from 'react-native';
import moment from 'moment';
import styles from './styles';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import Bucket from '../../asserts/Images/bucket-2.svg';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmptyModal from '../../Components/Modal/EmptyModal';
import SearchModal from '../../Components/Modal/SearchModal';
import SliderBox1 from '../../Components/SliderBox/SliderBox1';
import SliderBox2 from '../../Components/SliderBox/SliderBox2';
import SliderBox3 from '../../Components/SliderBox/SliderBox3';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ItemAddedModal from '../../Components/Modal/ItemAddedModal';
import OrderTimeModal from '../../Components/Modal/OrderTimeModal';
import {addToCart, removeFromCart} from '../../Redux/Action/actions';
import * as Animatable from 'react-native-animatable';
import {Animations} from '../../../Animations';
const ONE_SECOND_IN_MS = 1000;
const animation = {
  0: {opacity: 0, translateY: 70},
  1: {opacity: 1, translateY: 0},
};
const animations = Animations[Math.floor(Math.random() * Animations.length)];

const duration = 10;
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

class Menu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      refreshing: false,
      masterList: [],
      list: [],
      fishList: [],
      textInputText: '',
      textInputText1: '',
      showFishMenu: true,
      day: moment().format('dddd'),
      inputColor: false,
      fishtxt: false,
      kidstxt: false,
      iceCreamtxt: false,
      hotBeveragetxt: false,
      coldBeveragetxt: false,
      desserttxt: false,
      friestxt: false,
      wrapstxt: false,
      wingstxt: false,
      steakstxt: false,
      chickentxt: false,
      sandwichtxt: false,
      zingertxt: false,
      burgerstxt: false,
      appetizerstxt: false,
      showLoader: true,
      showModal: false,
      showCartModal: false,
      showSearchModal: false,
      imgLoading: true,
      searchModal: false,
      cartEmptyModal: false,

      // array: [
      //   {
      //     key: '1',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/fishhh.svg?alt=media&token=43338fb2-da22-491f-b5a2-c9174795a038',
      //   },
      //   {
      //     key: '2',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '3',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/baby.svg?alt=media&token=59d1e4b0-1ee1-4a6d-b455-d913e9d7cb9f',
      //   },
      //   {
      //     key: '4',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '5',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '6',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '7',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '8',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '9',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '10',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      //   {
      //     key: '11',
      //     img: 'https://firebasestorage.googleapis.com/v0/b/howdyapp-20885.appspot.com/o/bucket-2.svg?alt=media&token=043da9f9-dbea-49b5-859c-726f170ba902',
      //   },
      // ],
    };
  }

  // filter = () => {
  //   const {list, masterList} = this.state;

  //   let filterArray = masterList.filter((val, i) => {
  //     if (val.Cat === 'fish') {
  //       return val;
  //     }
  //   });
  //   this.setState({list: filterArray});
  //   Vibration.vibrate();
  // };

  fishFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'fish') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };

  kidsFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'kids') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };

  iceCreamShakeFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'IceCreamShakes') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  hotBeverageFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'HotBeverages') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  coldBeverageFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'ColdBeverage') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  dessertFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'dessert') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  friesFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'fries') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  wrapFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'wraps') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  wingsFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'wings') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  steakFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'steaks') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  chickenFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'chicken') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  sandwichFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'sandwich') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  zingersFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'zingers') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  burgersFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'burgers') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };
  appetizersFilter = () => {
    const {list, masterList} = this.state;

    let filterArray = masterList.filter((val, i) => {
      if (val.Cat == 'appetizers') {
        return val;
      }
    });
    this.setState({list: filterArray});
    Vibration.vibrate();
  };

  componentDidMount() {
    this.Menu();
    this.makeSearchMenu();
    setTimeout(() => {
      this.setState({imgLoading: false});
    }, 1000);
  }

  Menu = () => {
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
        this.setState({list: newArray, masterList: newArray});
      })
      .catch(error => {
        console.log(error);
        alert('Your Network Connection Is Not Good');
      })
      .finally(() => {
        this.setState({imgLoading: false});
      });
  };
  makeSearchMenu = () => {
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
        this.setState({fishList: newArray, masterList: newArray});
      })
      .catch(error => {
        console.log(error);
        alert('Your Network Connection Is Not Good');
      });
  };

  renderMenu = ({item, index}) => {
    const {showSearchModal} = this.state;
    return (
      <Animatable.View
      // iterationCount={1}
      // useNativeDriver
      // animation={animations}
      // delay={index * 300}
      >
        <Pressable onPress={() => {}} style={styles.parent}>
          <View style={styles.subPraent}>
            <View style={styles.productContainer}>
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate('FoodDetail', {Product: item});
                }}
                style={{
                  marginTop: '5%',
                  alignItems: 'center',
                }}>
                {this.state.imgLoading ? (
                  <LottieView
                    style={styles.lottie}
                    source={require('../../asserts/Animations/load.json')}
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
                      style={styles.productImg}
                      source={{
                        uri: item.Img,
                        priority: FastImage.priority.high,
                      }}
                    />
                  </Animatable.View>
                )}
              </Pressable>

              <Text style={styles.productTitle}>{item.Title}</Text>

              <View style={{bottom: 46, position: 'absolute'}}>
                {item.Type == 'AVAILABLE FOR DINE IN ONLY' ? (
                  <Text style={styles.productType}>{item.Type}</Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={styles.productSub}>
                    {item.SubTitle}
                  </Text>
                )}
              </View>
              <View
                style={{
                  bottom: 16,
                  position: 'absolute',
                }}>
                <Text style={styles.productPrice}>PKR {item.Price}</Text>
              </View>
              {item.Type == 'AVAILABLE FOR DINE IN ONLY' ? null : (
                <Pressable
                  onPress={() => {
                    var date = moment().format('hh:mm');
                    if (this.state.day == 'Satuday') {
                      if (date >= '02:00') {
                        this.setState({showModal: true});
                        console.log('saturday restaurant closed' + date);
                      } else {
                        this.props.addItemToCart(item);
                        this.setState({showCartModal: true});
                      }
                    } else {
                      if (date >= '12:00') {
                        this.setState({showModal: true});
                        console.log(
                          'not saturday and restaurant closed' + date,
                        );
                      } else {
                        this.props.addItemToCart(item);
                        this.setState({showCartModal: true});
                      }
                    }
                  }}
                  style={styles.cartBtnContainer}>
                  <View style={styles.cartBtnSub}>
                    <Ionicons name="cart-outline" size={22} color={'white'} />
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };
  // iconList = () => {
  //   return this.state.array.map(element => {
  //     return (
  //       <Pressable
  //         style={styles.button}
  //         onPress={() => {
  //           this.filter();
  //         }}>
  //         <SvgUri width="50%" height="50%" uri={element.img} />
  //       </Pressable>
  //     );
  //   });
  // };
  menuHeader = ({item, index}) => {
    return (
      <>
        <View style={styles.menuHeaderContain}>
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
            style={styles.imgLogo}
            source={require('../../asserts/Images/howdy.jpeg')}
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
              <Text style={styles.counterTxt}>{this.props.reducer.length}</Text>
            ) : null}
          </Pressable>
        </View>
        <Animatable.View

        // useNativeDriver animation="bounceInLeft" delay={233}
        >
          <ScrollView
            contentContainerStyle={{
              marginTop: '2%',
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {/* {this.iconList()} */}

            <Pressable
              style={styles.button}
              onPress={() => {
                this.fishFilter();
                this.setState({
                  fishtxt: true,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/fish.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.kidsFilter();
                this.setState({
                  kidstxt: true,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                });
              }}>
              {/* <SvgUri uri={svgUrl} /> */}
              <Bucket />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.iceCreamShakeFilter();
                this.setState({
                  iceCreamtxt: true,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/milkshake.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.hotBeverageFilter();
                this.setState({
                  hotBeveragetxt: true,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                });
              }}>
              <Image
                source={require('../../asserts/Images/hot-beverage.png')}
              />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                activeIndex.setValue(index);
                this.coldBeverageFilter();
                this.setState({
                  coldBeveragetxt: true,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/beverage.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.dessertFilter();
                this.setState({
                  desserttxt: true,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                  friestxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/dessert.png')} />
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => {
                this.friesFilter();
                this.setState({
                  friestxt: true,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                  wrapstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/fries.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.wrapFilter();
                this.setState({
                  wrapstxt: true,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/burrito.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.wingsFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: true,
                });
              }}>
              <Image
                source={require('../../asserts/Images/chicken-wings.png')}
              />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.steakFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: true,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/meat.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.chickenFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: true,
                  steakstxt: false,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/chicken.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.sandwichFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: true,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/sandwich.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.zingersFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: false,
                  zingertxt: true,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/zinger.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.burgersFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: false,
                  burgerstxt: true,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                  wingstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/hamburger.png')} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                this.appetizersFilter();
                this.setState({
                  wrapstxt: false,
                  friestxt: false,
                  desserttxt: false,
                  coldBeveragetxt: false,
                  hotBeveragetxt: false,
                  iceCreamtxt: false,
                  kidstxt: false,
                  fishtxt: false,
                  appetizerstxt: true,
                  burgerstxt: false,
                  zingertxt: false,
                  sandwichtxt: false,
                  chickentxt: false,
                  steakstxt: false,
                });
              }}>
              <Image source={require('../../asserts/Images/appetizer.png')} />
            </Pressable>
          </ScrollView>

          <View
            style={{
              backgroundColor: '#1A1E21',
            }}>
            <Pressable
              style={styles.sectionStyle}
              onPress={() => {
                this.setState({searchModal: true});
                // this.setState({showSearchModal: true});
                // this.setState({showLoader: false});
              }}>
              <View pointerEvents="none">
                <Text style={styles.searchTxt}>Search your favourites...</Text>
              </View>
              <FontAwesome name={'filter'} size={22} color={'white'} />
            </Pressable>
          </View>
        </Animatable.View>
        {this.state.fishtxt ? (
          <>
            <View style={styles.TitleAndLogo}>
              <Image
                tintColor="#DFBC50"
                style={styles.star}
                source={require('../../asserts/Images/favourites.png')}
              />
              <View style={styles.title}>
                <Text style={styles.titleTxt}>FISH MENU</Text>
              </View>
            </View>
          </>
        ) : null}
        {this.state.kidstxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>KIDS MENU</Text>
            </View>
          </View>
        ) : null}
        {this.state.iceCreamtxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>ICE CREAM SHAKES</Text>
            </View>
          </View>
        ) : null}
        {this.state.hotBeveragetxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>HOT BEVERAGES</Text>
            </View>
          </View>
        ) : null}
        {this.state.coldBeveragetxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>COLD BEVERAGES</Text>
            </View>
          </View>
        ) : null}
        {this.state.desserttxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>DESSERTS</Text>
            </View>
          </View>
        ) : null}
        {this.state.friestxt ? (
          <View style={{backgroundColor: '#1A1E21'}}>
            <SliderBox1 />
            <View style={styles.TitleAndLogo}>
              <Image
                tintColor="#DFBC50"
                style={styles.star}
                source={require('../../asserts/Images/favourites.png')}
              />
              <View style={styles.title}>
                <Text style={styles.titleTxt}>FRYZ</Text>
              </View>
            </View>
          </View>
        ) : null}
        {this.state.wrapstxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>WRAPS</Text>
            </View>
          </View>
        ) : null}
        {this.state.wingstxt ? (
          <View style={{}}>
            <SliderBox2 />
            <View style={styles.TitleAndLogo}>
              <Image
                tintColor="#DFBC50"
                style={styles.star}
                source={require('../../asserts/Images/favourites.png')}
              />
              <View style={styles.title}>
                <Text style={styles.titleTxt}>WINGS</Text>
              </View>
            </View>
          </View>
        ) : null}
        {this.state.steakstxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>STEAKS</Text>
            </View>
          </View>
        ) : null}
        {this.state.chickentxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>ROTISSERIE CHICKEN</Text>
            </View>
          </View>
        ) : null}
        {this.state.sandwichtxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>GRANDWICHES</Text>
            </View>
          </View>
        ) : null}
        {this.state.zingertxt ? (
          <View style={{}}>
            <SliderBox3 />
            <View style={styles.TitleAndLogo}>
              <Image
                tintColor="#DFBC50"
                style={styles.star}
                source={require('../../asserts/Images/favourites.png')}
              />
              <View style={styles.title}>
                <Text style={styles.titleTxt}>AMAZINGERS</Text>
              </View>
            </View>
          </View>
        ) : null}
        {this.state.burgerstxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>BURGERS</Text>
            </View>
          </View>
        ) : null}
        {this.state.appetizerstxt ? (
          <View style={styles.TitleAndLogo}>
            <Image
              tintColor="#DFBC50"
              style={styles.star}
              source={require('../../asserts/Images/favourites.png')}
            />
            <View style={styles.title}>
              <Text style={styles.titleTxt}>APPETIZERS THE TANTALIZERS</Text>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  fishMenu = () => {
    return (
      <FlatList
        // scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {contentOffset: {y: this.state.scrollY}},
        //     },
        //   ],
        //   {useNativeDriver: false},
        // )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={this.state.list}
        renderItem={this.renderMenu}
        ListHeaderComponent={this.menuHeader}
        keyExtractor={item => item.key}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 55}}
      />
    );
  };

  onCartClose = name => {
    this.setState({showCartModal: false});
  };
  render() {
    // const imgHeight = this.state.scrollY.interpolate({
    //   inputRange: [34, 150 - 50],
    //   outputRange: [39, 0],
    //   extrapolate: 'clamp',
    // });
    // const logoImgHeight = this.state.scrollY.interpolate({
    //   inputRange: [32, 150 - 50],
    //   outputRange: [78, 0],
    //   extrapolate: 'clamp',
    // });

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <OrderTimeModal showModal={this.state.showModal} />
        <ItemAddedModal
          showCartModal={this.state.showCartModal}
          hideCartModal={this.onCartClose}
        />
        <SearchModal searchModal={this.state.searchModal} />
        <EmptyModal cartEmptyModal={this.state.cartEmptyModal} />

        {this.fishMenu()}

        <BottomTabs navigation={this.props.navigation} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
