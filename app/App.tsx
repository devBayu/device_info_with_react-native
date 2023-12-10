import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch,
  Platform,
  Vibration,
} from 'react-native';
import DeviceInfo, {getIpAddress} from 'react-native-device-info';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';
import {
  ic_fingerprint,
  ic_gps,
  ic_battery,
  ic_vibration,
  ic_wifi,
} from '../assets/icon';
import NetInfo from '@react-native-community/netinfo';
import ReactNativeBiometrics from 'react-native-biometrics';

const biometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [deviceName, setDeviceName] = useState('');
  const [androidLevel, setAndroidLevel] = useState(0);
  const [baseOS, setBaseOS] = useState('');
  const [battery, setBattery] = useState(0);
  const [ipAddress, setIpAddress] = useState('');
  const [generalInfoDevice, setGeneralInfoDevice] = useState([{}]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const [fingerPrintEnabled, setFingerPrintEnabled] = useState(false);

  useEffect(() => {
    getDeviceName();
    getAndroidLevel();
    getBaseOs();
    getBatteryLevel();
    getIPAddress();
    getNetworkInfo();
  }, []);

  const getDeviceName = async () => {
    setDeviceName(await DeviceInfo.getDeviceName());
    let deviceName = await DeviceInfo.getDeviceName();
    setGeneralInfoDevice(oldState => [
      ...oldState,
      {name: 'Device Name', value: deviceName},
    ]);
  };

  const getAndroidLevel = async () => {
    setAndroidLevel(await DeviceInfo.getApiLevel());
    let androidLevel = await DeviceInfo.getApiLevel();
    setGeneralInfoDevice(oldState => [
      ...oldState,
      {name: 'Android Level', value: androidLevel},
    ]);
  };

  const getBaseOs = async () => {
    setBaseOS(Platform.OS);
  };

  const getBatteryLevel = async () => {
    let battery = await DeviceInfo.getBatteryLevel();
    setBattery(Math.round(battery * 100));
  };

  const getIPAddress = async () => {
    setIpAddress(await DeviceInfo.getIpAddress());
  };

  const getNetworkInfo = () => {
    NetInfo.fetch().then((info: any) => {
      setConnectionType(info.type);
    });
  };

  const toggleSwitch = (switchVal: string) => {
    switch (switchVal) {
      case 'FINGERPRINT':
        setFingerPrintEnabled(prevState => !prevState);
        break;
      case 'VIBRATION':
        setIsEnabled(prevState => !prevState);
      default:
        break;
    }
  };

  const handleValueChange = (type: string) => {
    switch (type) {
      case 'vibration':
        Vibration.vibrate(1 * 1000);
        setTimeout(() => {
          setIsEnabled(false);
        }, 1000);
        break;
      case 'fingerprint':
        getSensorAvailable();
        break;
    }
  };

  const getSensorAvailable = () => {
    biometrics
      .simplePrompt({promptMessage: 'Tap your finger'})
      .then(resultObject => {
        console.log("result : ", resultObject);
        
        const {success} = resultObject;

        if (success) {
          setFingerPrintEnabled(true);
          console.log('Successfull biometrics provided');
        } else {
          console.log('User Cancelled biometric prompt');
        }
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.baseContent}>
        <View style={styles.cardDeviceInfo}>
          <View style={styles.generalInfo}>
            <Text style={styles.txtItem}>{Platform.constants.Brand}</Text>
            <Text style={styles.txtItem}>{deviceName}</Text>
          </View>
          <View style={styles.generalInfo}>
            <Text style={styles.txtItem}>
              {baseOS.toLocaleUpperCase()} {androidLevel}
            </Text>
            <Text style={styles.txtItem}>
              {Platform.constants.Manufacturer}
            </Text>
          </View>
        </View>
        <View style={styles.cardListInfo}>
          <Image
            source={ic_battery}
            style={styles.iconStyle}
            resizeMode="center"
          />
          <View style={styles.wrapperTxtStorage}>
            <Text>Battery Capacity</Text>
            <Text>{battery} %</Text>
          </View>
        </View>
        <View style={styles.cardListInfo}>
          <Image
            source={ic_wifi}
            style={styles.iconStyle}
            resizeMode="center"
          />
          <View style={styles.wrapperTxtStorage}>
            <Text>{ipAddress}</Text>
            <Text>{connectionType.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.cardListInfo}>
          <Image
            source={ic_vibration}
            style={styles.iconStyle}
            resizeMode="center"
          />
          <View style={styles.wrapperSensorTest}>
            <Text>Sensor Vibration</Text>
            <Switch
              onValueChange={() => toggleSwitch('VIBRATION')}
              value={isEnabled}
              onChange={() => handleValueChange('vibration')}
            />
          </View>
        </View>
        <View style={styles.cardListInfo}>
          <Image
            source={ic_fingerprint}
            style={styles.iconStyle}
            resizeMode="center"
          />
          <View style={styles.wrapperSensorTest}>
            <Text>Sensor Fingerprint</Text>
            <Switch
              onValueChange={() => toggleSwitch('FINGERPRINT')}
              value={fingerPrintEnabled}
              onChange={() => handleValueChange('fingerprint')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
