import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerrr: {
    alignSelf: 'center',
    overflow: 'hidden', // for hide the not important parts from circle
    width: 500,
    height: 270,
  },
  background: {
    // this shape is a circle
    borderRadius: 800, // border borderRadius same as width and height
    width: 700,
    height: 700,
    marginLeft: -100, // reposition the circle inside parent view
    position: 'absolute',
    bottom: 0, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
  },
  image: {
    height: 270, // same width and height for the container
    width: 500,
    position: 'absolute', // position it in circle
    bottom: 0, // position it in circle
    marginLeft: 100, // center it in main view same value as marginLeft for circle but positive
  },

  title: {fontWeight: '600', color: 'grey', fontSize: 13},
  titlee: {fontWeight: '700', color: 'white', fontSize: 14},
  containerr: {
    backgroundColor: '#ffffff',
    borderRadius: 33,
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
    borderWidth: 1,
    width: '40%',
    height: 28,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllBtnContainer: {
    marginTop: '2%',
    width: Dimensions.get('window').width,
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
    marginTop: '4%',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
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
    color: '#0062AB',
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
  container: {
    backgroundColor: '#1A1E21',
    flex: 1,
  },
});
