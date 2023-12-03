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
  ic_storage,
  ic_vibration,
  ic_wifi,
} from '../assets/icon';
import NetInfo from '@react-native-community/netinfo';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNFS from 'react-native-fs';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [deviceName, setDeviceName] = useState('');
  const [androidLevel, setAndroidLevel] = useState(0);
  const [baseOS, setBaseOS] = useState('');
  const [memory, setMemory] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [ipAddress, setIpAddress] = useState('');
  const [generalInfoDevice, setGeneralInfoDevice] = useState([{}]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [connectionType, setConnectionType] = useState('');

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    getDeviceName();
    getAndroidLevel();
    getBaseOs();
    getTotalMemory();
    getTotalStorage();
    getIPAddress();
    getNetworkInfo();
    getStorageInfo();
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

  const getTotalMemory = async () => {
    let memory = await DeviceInfo.getTotalMemory();
    const kbToBytes = 1024;
    const decimal = 2;
    const index = Math.floor(Math.log(memory) / Math.log(kbToBytes));
    setMemory(Math.round(memory / Math.pow(kbToBytes, index)));
  };

  const getTotalStorage = async () => {
    let capacity = await DeviceInfo.getTotalDiskCapacity();
    setCapacity(capacity);
  };

  const getIPAddress = async () => {
    setIpAddress(await DeviceInfo.getIpAddress());
  };

  const parseToGb = (byte: number) => {
    const kbToBytes = 1024;
    const decimal = 2;
    return parseFloat(
      Math.floor(Math.log(byte) / Math.log(kbToBytes)).toFixed(decimal),
    );
  };

  const getNetworkInfo = () => {
    NetInfo.fetch().then((info: any) => {
      setConnectionType(info.type);
    });
  };

  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  const handleValueChange = (type: string) => {
    switch (type) {
      case 'vibration':
        Vibration.vibrate(1 * 1000);
        setTimeout(() => {
          setIsEnabled(false);
        }, 1000);
        break;
      case 'fingerprint':

        console.log(
          rnBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: 'haha',
          }).then((hjd) => {
            console.log('haha');
            
          }),
        );
        
        break;
    }
  };

  const getStorageInfo = () => {
    // RNFS.getFSInfo().then((info) => {
    //   console.log('INFO ', info);
    // })
    console.log('=>> ', RNFS);
    
  }

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
            source={ic_storage}
            style={styles.iconStyle}
            resizeMode="center"
          />
          <View style={styles.wrapperTxtStorage}>
            <Text>Internal Storage</Text>
            <Text>783 Gb / {capacity} Gb</Text>
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
              onValueChange={toggleSwitch}
              value={isEnabled}
              onChange={() => handleValueChange('vibration')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
