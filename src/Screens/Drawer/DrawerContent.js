import React from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import {Avatar, Drawer} from 'react-native-paper';
import styles from './styles';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

export function DrawerContent(props) {
  return (
    <View
      style={{
        backgroundColor: '#1A1E21',
        flex: 1,
      }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Avatar.Image
              source={require('../../asserts/Images/howdy.jpeg')}
              size={120}
            />
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: 'white',
                    }}
                    source={require('../../asserts/Images/home-2.png')}
                  />
                )}
                label="Home"
                labelStyle={{
                  fontSize: 16,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}
                children={HomeStack}
                onPress={() => {
                  props.navigation.navigate('HomeStack');
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSectionn}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: 'white',
                    }}
                    source={require('../../asserts/Images/menu.png')}
                  />
                )}
                label="MENU"
                labelStyle={{
                  fontSize: 15,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}
                children={MenuStackk}
                onPress={() => {
                  props.navigation.navigate('MenuStackk');
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSectionn}>
              <DrawerItem
                icon={({color, size}) => (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: 'white',
                    }}
                    source={require('../../asserts/Images/location.png')}
                  />
                )}
                label="OUTLETS"
                labelStyle={{
                  fontSize: 14,
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'white',
                }}
                onPress={() => {
                  props.navigation.navigate('Outlets');
                }}
              />
            </Drawer.Section>

            <Drawer.Section style={styles.bottomDrawerSectionn}>
              {/* <DrawerItem
                icon={({color, size}) => (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#DA2328',
                    }}
                    source={require('../../asserts/Images/switch.png')}
                  />
                )}
                label="LOGOUT"
                labelStyle={{
                  fontSize: 15,
                  fontFamily: 'RobotoSlab-Bold',
                  marginLeft: 6,
                  color: '#DA2328',
                }}
                onPress={() => {
                  alert('logout');
                }}
              /> */}
            </Drawer.Section>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
