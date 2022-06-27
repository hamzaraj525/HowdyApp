import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {LogBox, StyleSheet} from 'react-native';

import Cart from './src/Screens//Cart/Cart.js';
import Home from './src/Screens/Home.js';
import Menu from './src/Screens/Menu/Menu.js';
import Login from './src/Screens/Login/Login.js';
import SignUp from './src/Screens/SignUp/SignUp.js';
import Outlets from './src/Screens/Outlets/Outlets';
import FoodDetail from './src/Screens/FoodDetail/FoodDetail';
import LogoScreen from './src/Screens/LogoScreen/LogoScreen';
import ForgotPassword from './src/Screens/ForgotPwd/ForgotPassword';
import {DrawerContent} from './src/Screens/Drawer/DrawerContent';
import store from './src/Redux/Store/store';
import BottomTabs from './src/Components/BottomTabs/BottomTabs';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();
const ScreenDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
export default class App extends PureComponent {
  render() {
    // TabScreen = () => {
    //   return (
    //     <Tab.Navigator
    //       screenOptions={{
    //         headerShown: false,
    //         tabBarLabelStyle: {color: '#DA2328'},
    //         tabBarStyle: {backgroundColor: '#FED116'},
    //       }}>
    //       <Tab.Screen
    //         name="Home"
    //         children={HomeStack}
    //         options={{
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#1A1E21',
    //                   width: 25,
    //                   height: 25,
    //                 }}
    //                 source={require('./src/asserts/Images/home.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Outlets"
    //         component={Outlets}
    //         options={{
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#DA2328',
    //                   alignSelf: 'center',
    //                   width: 30,
    //                   height: 30,
    //                 }}
    //                 source={require('./src/asserts/Images/pin.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Menu"
    //         component={MenuStackk}
    //         options={{
    //           title: '',
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               onPress={() => {
    //                 this.props.navigation.navigate('Menu');
    //               }}
    //               style={[
    //                 styles.cartBtnBlue,
    //                 {
    //                   marginBottom: 15,
    //                   borderRadius: 100,
    //                   backgroundColor: '#1A1E21',
    //                   height: 75,
    //                   width: 75,
    //                 },
    //               ]}>
    //               <View
    //                 style={[
    //                   styles.cartBtnBlue,
    //                   {
    //                     borderRadius: 100,
    //                     backgroundColor: '#DA2328',
    //                     height: 53,
    //                     width: 53,
    //                   },
    //                 ]}>
    //                 <Image
    //                   style={{
    //                     width: 38,
    //                     height: 38,
    //                     tintColor: 'white',
    //                   }}
    //                   source={require('./src/asserts/Images/menu.png')}
    //                 />
    //               </View>
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Cart"
    //         component={Cart}
    //         options={{
    //           tabBarBadge: '',
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#DA2328',
    //                   width: 30,
    //                   height: 30,
    //                 }}
    //                 source={require('./src/asserts/Images/shop.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Login"
    //         children={AuthStack}
    //         options={{
    //           header: () => null,
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   width: 30,
    //                   height: 30,
    //                   borderRadius: 30 / 2,
    //                 }}
    //                 source={require('./src/asserts/Images/howdy.jpeg')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //     </Tab.Navigator>
    //   );
    // };

    // MenuStack = () => {
    //   return (
    //     <Tab.Navigator
    //       initialRouteName="Menu"
    //       screenOptions={{
    //         tabBarLabelStyle: {color: '#DA2328'},
    //         tabBarStyle: {backgroundColor: '#FED116'},
    //       }}>
    //       <Tab.Screen
    //         name="Home"
    //         children={HomeStack}
    //         options={{
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#1A1E21',
    //                   width: 25,
    //                   height: 25,
    //                 }}
    //                 source={require('./src/asserts/Images/home.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Outlets"
    //         component={Outlets}
    //         options={{
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#DA2328',
    //                   alignSelf: 'center',
    //                   width: 30,
    //                   height: 30,
    //                 }}
    //                 source={require('./src/asserts/Images/pin.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Menu"
    //         component={MenuStackk}
    //         options={{
    //           header: () => null,
    //           title: '',
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               onPress={() => {
    //                 this.props.navigation.navigate('Menu');
    //               }}
    //               style={[
    //                 styles.cartBtnBlue,
    //                 {
    //                   marginBottom: 15,
    //                   borderRadius: 100,
    //                   backgroundColor: '#1A1E21',
    //                   height: 75,
    //                   width: 75,
    //                 },
    //               ]}>
    //               <View
    //                 style={[
    //                   styles.cartBtnBlue,
    //                   {
    //                     borderRadius: 100,
    //                     backgroundColor: '#DA2328',
    //                     height: 53,
    //                     width: 53,
    //                   },
    //                 ]}>
    //                 <Image
    //                   style={{
    //                     width: 38,
    //                     height: 38,
    //                     tintColor: 'white',
    //                   }}
    //                   source={require('./src/asserts/Images/menu.png')}
    //                 />
    //               </View>
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Cart"
    //         component={Cart}
    //         options={{
    //           tabBarBadge: '',
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   tintColor: '#DA2328',
    //                   width: 30,
    //                   height: 30,
    //                 }}
    //                 source={require('./src/asserts/Images/shop.png')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //       <Tab.Screen
    //         name="Login"
    //         children={AuthStack}
    //         options={{
    //           tabBarIcon: ({focused}) => (
    //             <View
    //               styles={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //               }}>
    //               <Image
    //                 style={{
    //                   width: 30,
    //                   height: 30,
    //                   borderRadius: 30 / 2,
    //                 }}
    //                 source={require('./src/asserts/Images/howdy.jpeg')}
    //               />
    //             </View>
    //           ),
    //         }}
    //       />
    //     </Tab.Navigator>
    //   );
    // };

    AuthStack = () => (
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    );
    HomeStack = () => (
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="LogoScreen"
          component={LogoScreen}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Home"
          component={Home}
        />

        <Stack.Screen
          options={{header: () => null}}
          name="FoodDetail"
          component={FoodDetail}
        />
        <Stack.Screen
          options={{
            header: () => null,
          }}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{
            header: () => null,
          }}
          name="AuthStack"
          children={AuthStack}
        />

        <Stack.Screen
          options={{header: () => null}}
          name="Menu"
          component={Menu}
        />
      </Stack.Navigator>
    );
    MenuStackk = () => (
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Menu"
          component={Menu}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="FoodDetail"
          component={FoodDetail}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{
            header: () => null,
          }}
          name="AuthStack"
          children={AuthStack}
        />
      </Stack.Navigator>
    );

    return (
      <Provider store={store}>
        <NavigationContainer>
          <ScreenDrawer.Navigator
            drawerType="slide"
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              drawerStyle: {
                width: '85%',
              },
              swipeEdgeWidth: 0,
              headerShown: false,
            }}>
            <ScreenDrawer.Screen name="HomeStack" children={HomeStack} />
            <ScreenDrawer.Screen name="MenuStackk" children={MenuStackk} />
            <ScreenDrawer.Screen name="Outlets" component={Outlets} />
          </ScreenDrawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
  cartBtnBlue: {
    width: '10%',
    borderRadius: 100,
    height: 45,
    width: 45,
    backgroundColor: '#DA2328',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
