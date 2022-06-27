import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ItemAddedModal from '../Modal/ItemAddedModal';
import OrderTimeModal from '../Modal/OrderTimeModal';
import firestore from '@react-native-firebase/firestore';
export default class SearchModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fishList: [],
      masterList: [],
      day: moment().format('dddd'),
      showModal: false,
      showCartModal: false,
      showSearchModal: false,
      showLoader: true,
    };
  }
  searchFlter = text => {
    const {fishList, masterList} = this.state;
    if (text) {
      setTimeout(() => {
        this.setState({showLoader: false});
      }, 1200);

      const filterArray = masterList.filter((item, i) => {
        const itemData = item.Title
          ? item.Title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({showLoader: true});
      this.setState({fishList: filterArray});
    } else {
      this.setState({fishList: null});
    }
  };

  componentDidMount() {
    this.makeSearchMenu();
  }

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

  renderSearchModal = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          width: Dimensions.get('window').width / 2,
        }}>
        <View style={styles.parentContain}>
          <View style={styles.contain}>
            <Pressable
              onPress={() => {
                this.props.navigation.navigate('FoodDetail', {Product: item});
              }}
              style={{
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <View style={{display: this.state.imgLoading ? 'flex' : 'none'}}>
                <LottieView
                  style={{width: 90, height: 90}}
                  source={require('../../asserts/Animations/load.json')}
                  autoPlay
                  loop={true}
                />
              </View>
              <View style={{display: this.state.imgLoading ? 'none' : 'flex'}}>
                <Image
                  onLoad={() => {
                    this.setState({imgLoading: false});
                  }}
                  style={{
                    borderRadius: 30,
                    marginBottom: 10,
                    width: 140,
                    height: 120,
                  }}
                  source={{uri: item.Img}}
                />
              </View>
            </Pressable>

            <Text style={styles.titleTxt}>{item.Title}</Text>
            <View style={{bottom: 55, position: 'absolute'}}>
              {item.Type == 'AVAILABLE FOR DINE IN ONLY' ? (
                <Text style={styles.type}>{item.Type}</Text>
              ) : (
                <Text style={styles.SubTitleTxt}>{item.SubTitle}</Text>
              )}
            </View>

            <View
              style={{
                bottom: 27,
                position: 'absolute',
              }}>
              <Text style={styles.priceTxt}>PKR {item.Price}</Text>
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
                      console.log('not saturday and restaurant closed' + date);
                    } else {
                      this.props.addItemToCart(item);
                      this.setState({showCartModal: true});
                    }
                  }
                }}
                style={styles.cartParent}>
                <View style={styles.cartContain}>
                  <Ionicons name="cart-sharp" size={22} color={'white'} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  searchFishMenu = () => {
    return (
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={this.state.fishList}
        renderItem={this.renderSearchModal}
        keyExtractor={item => item.key}
      />
    );
  };
  render() {
    const {searchModal} = this.props;
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.setState({searchModal: false});
          }}
          visible={searchModal}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#1A1E21',
            }}>
            <View style={styles.sectionStylee}>
              <Pressable
                style={{}}
                onPress={() => {
                  this.setState({searchModal: !searchModal});
                }}>
                <Entypo name={'cross'} size={28} color={'white'} />
              </Pressable>
              <TextInput
                autoFocus={true}
                style={{fontSize: 18, color: 'white'}}
                onChangeText={text => {
                  this.setState({textInputText1: text}, this.searchFlter(text));
                }}
                placeholder="Search your ..."
                placeholderTextColor={this.state.inputColor ? 'white' : 'grey'}
                underlineColorAndroid="transparent"
              />
            </View>

            {this.state.showLoader == true ? (
              <LottieView
                style={styles.load}
                source={require('../../asserts/Animations/load.json')}
                autoPlay
                loop={false}
              />
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.result}>
                  <Text style={{fontSize: 14, color: 'white'}}>Results</Text>
                  <Text style={{fontSize: 12, color: 'grey'}}>
                    10 items Found
                  </Text>
                </View>
                {this.searchFishMenu()}
              </View>
            )}
            {/* <OrderTimeModal />
            <ItemAddedModal /> */}
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
  contain: {
    borderRadius: 30,
    backgroundColor: '#2C2C2C',
    marginTop: '5%',
    width: '90%',
    height: 290,
  },
  priceTxt: {
    paddingHorizontal: '8%',
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
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

  cartContain: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: null,
    borderRadius: 100,
    backgroundColor: '#DA2328',
    height: 45,
    width: 45,
  },
  cartParent: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'black',
    height: 57,
    width: 57,
  },
  result: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  load: {marginTop: 15, alignSelf: 'center', width: 100, height: 100},
  parentContain: {
    marginBottom: '4%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    color: 'white',
    fontSize: 20,
    marginBottom: '7%',
    paddingHorizontal: '8%',
    fontWeight: '800',
  },
  type: {color: '#DA2328', fontSize: 15, paddingHorizontal: '8%'},
  SubTitleTxt: {
    color: 'grey',
    fontSize: 15,
    paddingHorizontal: '8%',
  },
});
