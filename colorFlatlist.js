import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ImageBackground,
  Platform,
  TouchableOpacity,
  TextInput,
  Touchable,
  Pressable,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
const List = ({navigation}) => {
  const [Done, setDone] = useState();
  const [visible, setvisible] = useState(false);
  const [defaultColor, setdefaultcolor] = useState('#121212');
  const [checkboxcolor, setcheckboxcolor] = useState('#121212');
  const [icon, setIcon] = useState('./assets/Images/lockSolid.png');
  const [icEye, setIcEye] = React.useState('checkbox-passive');
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(true);
  const [listData, setListData] = useState([
    {
      key: '1',
      name: 'General Life',
      icon: require('./assets/Images/General.png'),
      color: '#00ff00',
      name2: '20 Cards',
      backgroundColor: '#97d700',
      Image: require('./assets/Images/corner.png'),
      name1color: '#ffffff',
      name2color: '#ffffff',
      img2: require('./assets/Images/CellLeftContainer.png'),
      img2color: '#00ff00',
      iconcolor: '#000000',
      righticon: require('./assets/Images/corner.png'),
      righticoncolor: '#00ff00',
      boxicon: require('./assets/Images/undone.png'),
      boxiconcolor: '#ffffff',
    },
    {
      key: '2',
      name: 'Entertainment',
      icon: require('./assets/Images/Beautyicon.png'),
      color: '#ff3366',
      name2: '137 Cards',
      backgroundColor: '#ff3366',
      name1color: '#ff3366',
      name2color: '#ffffff',
      img2: require('./assets/Images/CellLeftContainer.png'),
      img2color: '#ff3366',
      righticon: require('./assets/Images/corner.png'),
      righticoncolor: '#ff3366',
      boxicon: require('./assets/Images/undone.png'),
      boxiconcolor: '#ffffff',
    },
    {
      key: '3',
      name: 'PRANK',
      icon: require('./assets/Images/icon4.png'),
      color: '#f06100',
      name2: '137 Cards',
      backgroundColor: '#f06100',
      name1color: '#ffffff',
      name2color: '#ffffff',
      img2: require('./assets/Images/CellLeftContainer.png'),
      img2color: '#f06100',
      righticon: require('./assets/Images/corner.png'),
      righticoncolor: '#f06100',
      boxicon: require('./assets/Images/undone.png'),
      boxiconcolor: '#ffffff',
    },
  ]);

  const changeColor = index => {
    const Colours = listData.map(item => {
      item.selected = false;
      return item;
    });
    Colours[index].selected = true;
    setListData(Colours);
  };

  const changeIcon = index => {
    const icons = listData.map(item => {
      item.selected = false;
      return item;
    });
    icons[index].selected = true;
    setIcon(icons);
    props.navigation.navigate('newScreen');
  };

  renderList = ({item, index}) => {
    return (
      <View style={{margin: 10, top: '60%'}}>
        <Image
          style={{
            width: '88%',
            height: 60,
            top: 10,
            backgroundColor: item.selected ? item.img2color : '#808080',
            opacity: 1,
          }}
          source={require('./assets/Images/Rectangle8.png')}
        />
        <Image
          style={{
            position: 'absolute',
            height: 60,
            width: '20%',
            tintColor: item.img2color,
            top: 10,
            borderRadius: 5,
          }}
          source={item.img2}
        />
        <Image
          style={{
            position: 'absolute',
            height: 30,
            width: 30,
            margin: 10,
            top: 10,
          }}
          source={item.icon}
        />
        <ImageBackground
          style={{
            height: '110%',
            width: '18%',
            alignSelf: 'flex-end',
            position: 'absolute',
            top: 5,
            tintColor: item.righticoncolor,
            zIndex: -1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          source={item.righticon}>
          {/* <TouchableOpacity
          style={{alignSelf: 'flex-end', position: 'absolute', zIndex: 1}}
          onPress={() => {
            changeIcon(index), changeColor(index);
          }}>
          {item.selected ? (
            <Image
              style={{height: 20, width: 20, borderRadius: 5}}
              source={require('./assets/Images/lockSolid.png')}
            />
          ) : (
            <Image
              style={{height: 20, width: 20, borderRadius: 5}}
              source={item.boxicon}
            />
          )}
        </TouchableOpacity> */}

          <Checkbox
            style={{}}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked), changeColor(index);
            }}
          />
        </ImageBackground>

        <Text
          style={{
            position: 'absolute',
            left: '22%',
            top: '20%',
            fontSize: 20,
            color: item.name1color,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: '22%',
            top: '75%',
            fontSize: 15,
            color: item.name2color,
          }}>
          {item.name2}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        ...Platform.select({
          ios: {
            zIndex: -1,
          },
          android: {
            zIndex: -1,
          },
        }),
      }}>
      <FlatList
        contentContainerStyle={{paddingBottom: 150}}
        style={{backgroundColor: '#000000'}}
        data={listData}
        renderItem={renderList}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  iconstyle: {
    height: 70,
    width: 60,
    backgroundColor: '#90EE90',
  },
});
export default List;
