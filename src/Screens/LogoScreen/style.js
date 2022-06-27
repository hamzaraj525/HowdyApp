import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#1A1E21',
  },
  txt: {
    color: 'white',
  },
  loginBtn: {
    backgroundColor: '#DA2328',
    width: '50%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  sectionStyle: {
    marginBottom: 20,
    marginTop: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: 60,
    padding: '4%',
    borderRadius: 60 / 2,
    backgroundColor: '#F6F3F5',
  },
  containerr: {
    width: '90%',
    height: 120,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  cityTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
  img: {
    width: 100,
    height: 130,
  },
  lottie: {
    position: 'absolute',
    bottom: 10,
    width: 100,
    height: 100,
  },
});
