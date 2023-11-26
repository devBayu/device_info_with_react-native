import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: (isDarkMode : boolean) => ({
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }),
});
