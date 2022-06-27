import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  fpTxt: {
    fontFamily: 'Rustler',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  outTxt: {color: 'transparent', fontWeight: 'bold', fontSize: 20},

  loginBtn: {
    marginTop: null,
    width: '80%',
    backgroundColor: '#DA2328',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Ti: {
    fontFamily: 'RobotoSlab-Bold',
    width: '90%',
    height: 30,
    marginLeft: 6,
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
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F3F5',
    borderRadius: 25,
    padding: 12,
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
});
