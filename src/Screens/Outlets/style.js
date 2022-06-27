import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  loginBtn: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
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

  container: {
    flex: 1,
    backgroundColor: '#1A1E21',
  },
  outletContain: {
    margin: 10,
    width: 250,
    borderRadius: 25,
    backgroundColor: '#2C2C2C',
    marginTop: '5%',
  },
  getdirecTxt: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: 'RobotoSlab-Bold',
    color: 'white',
  },
  callTxt: {
    fontSize: 17,
    fontFamily: 'RobotoSlab-Bold',
    marginLeft: 10,
    color: 'black',
  },

  parent: {
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
  },
  ouTxt: {color: 'transparent', fontWeight: 'bold', fontSize: 20},

  ouletTxt: {color: 'white', fontFamily: 'RUSTLER', fontSize: 40},

  mapBtn: {
    backgroundColor: '#DA2328',
    width: '90%',
    marginTop: 20,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'white',
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  contactContain: {alignItems: 'center', marginTop: 20, flexDirection: 'row'},

  img: {marginTop: 20, width: 190, height: 190},
  location: {
    marginTop: 20,
    color: 'white',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 26,
  },
});
