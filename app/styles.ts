import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  baseContent: {
    paddingHorizontal: '5%',
    marginTop: '15%',
  },

  cardDeviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  generalInfo: {
    flexDirection: 'column',
    backgroundColor: 'skyblue',
    width: '40%',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },

  txtItem: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  cardListInfo: {
    backgroundColor: 'skyblue',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },

  iconStyle: {
    width: 30,
    height: 30,
  },

  wrapperTxtStorage: {
    marginLeft: 10,
    gap: 5,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#FFF',
  },

  wrapperSensorTest: {
    borderLeftWidth: 1,
    borderLeftColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 10,
    gap: 5,
    width: '80%',
  },
});
