import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  Pressable,
} from 'react-native';
import database from '@react-native-firebase/database';
import GetLocation from 'react-native-get-location';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const Test = navigation => {
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const [loc, setLoc] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [wait, setWait] = useState(true);
  // const [searchText, setSearchText] = React.useState('');
  // const [homeList, setHomesList] = React.useState([
  //   {
  //     key: 1,
  //     type: 'Private',
  //     title: 'Luxury Rooms',
  //     bed: '2',
  //     bedRoom: '2',
  //     bathRoom: '2',
  //     oldPrice: '$100',
  //     newPrice: '$50',
  //     totalPrice: '$50',
  //     img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  //   },
  //   {
  //     key: 2,
  //     type: 'Private',
  //     title: 'Beautifull Rooms',
  //     bed: '5',
  //     bedRoom: '5',
  //     bathRoom: '6',
  //     oldPrice: '$100',
  //     newPrice: '$50',
  //     totalPrice: '$50',
  //     img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  //   },
  //   {
  //     key: 3,
  //     type: 'Private',
  //     title: 'Beautifull Rooms',
  //     bed: '5',
  //     bedRoom: '5',
  //     bathRoom: '6',
  //     oldPrice: '$100',
  //     newPrice: '$50',
  //     totalPrice: '$50',
  //     img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
  //   },
  // ]);

  useEffect(() => {
    try {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log(location);
          setWait(false);
          setLatitude(parseFloat(location.latitude));
          setLongitude(parseFloat(location.longitude));
          addToRealTimeDatabase();
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const newReference = database().ref('/Locations').push();

  addToRealTimeDatabase = () => {
    newReference
      .set({
        id: newReference.key,
        lat: latitude,
        long: longitude,
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Your Network Connection Is Not Good');
      });
  };

  // getAddress = (latitude, longitude) => {
  //   Geocoder.init('AIzaSyBN6WJipmQrdlSy-jpAFeuV2R8nwPQMqIU', {language: 'en'});
  //   try {
  //     Geocoder.from('Colosseum')
  //       .then(json => {
  //         var location = json.results[0].geometry.location;
  //         alert(location);
  //       })
  //       .catch(error => console.warn(error));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // renderHomes = ({item, index}) => {
  //   return (
  //     <View style={styles.home}>
  //       <Pressable onPress={() => alert(item.title)} style={{}}>
  //         <Image style={styles.homeImage} source={{uri: item.img}} />
  //       </Pressable>
  //       <View style={{marginTop: 10, flexDirection: 'row'}}>
  //         <Text style={{marginRight: 10, color: 'grey'}}>{item.bed} bed</Text>
  //         <Text style={{marginRight: 10, color: 'grey'}}>
  //           {item.bedRoom} bedRoom
  //         </Text>
  //       </View>
  //       <Text style={{marginTop: 10}}>{item.title} </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           marginTop: 10,
  //         }}>
  //         <Text
  //           style={{
  //             marginRight: 10,
  //             color: 'grey',
  //             textDecorationLine: 'line-through',
  //           }}>
  //           ${item.oldPrice}
  //         </Text>
  //         <Text style={{color: 'black'}}>${item.newPrice} / night </Text>
  //       </View>
  //       <Text
  //         style={{
  //           color: 'grey',
  //           textDecorationLine: 'underline',
  //           marginTop: 10,
  //         }}>
  //         ${item.totalPrice} Total
  //       </Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      {wait ? (
        <Text style={{color: 'black', alignSelf: 'center', fontSize: 60}}>
          wait....
        </Text>
      ) : (
        <MapView
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={{
            height: '80%',
            width: '100%',
            borderBottomStartRadius: 200,
            borderTopEndRadius: 200,
          }}
          initialRegion={{
            latitude: 37.4219983,
            longitude: -122.084,
            latitudeDelta: 0.0009,
            longitudeDelta: 0.0007,
          }}>
          <Marker
            coordinate={{
              latitude: 37.4219983,
              longitude: -122.084,
              latitudeDelta: 0.0009,
              longitudeDelta: 0.0007,
            }}
            title={'Current Location'}
            description={'This is your current location'}
          />
          {/* <Marker
            coordinate={destination}
            title={'other Location'}
            description={'This is your current location'}
          /> */}
          {/* <MapViewDirections
            origin={{
              latitude: latitude,
              longitude: longitude,
            }}
            destination={destination}
            strokeWidth={3}
            strokeColor="hotpink"
            apikey={'AIzaSyAGzggQ8xNW5_E0wwAVjUqaSIiw5MQG9cA'}
          /> */}
        </MapView>
      )}
      {/* <Pressable
        onPress={() => {
          getAddress(latitude, longitude);
        }}>
        <Text style={{color: 'black', fontSize: 40}}>Touch</Text>
      </Pressable> */}

      {/* <TextInput
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
        }}
        style={{fontSize: 20, marginTop: 20, width: '90%'}}
        placeholder="where are you going"
        placeholderTextColor={'grey'}
      /> */}
      {/* <FlatList
        data={homeList}
        inverted
        showsHorizontalScrollIndicator={false}
        renderItem={renderHomes}
        extraData={homeList}
        keyExtractor={item => item.key}
      /> */}
    </SafeAreaView>
  );
};
export default Test;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    flex: 1,
  },
  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  home: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width - 35,
  },
  homeImage: {
    width: Dimensions.get('window').width - 30,
    borderRadius: 20,
    alignSelf: 'center',
    height: 240,
  },
});
