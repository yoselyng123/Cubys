import { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import themeContext from '../context/themeContext';
import { EventRegister } from 'react-native-event-listeners';

const RadioBtn = ({ appearanceTheme, setAppearanceTheme, value }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.radiobuttonItem}>
      <RadioButton
        value='light'
        status={appearanceTheme === value ? 'checked' : 'unchecked'}
        onPress={() => {
          setAppearanceTheme(value);
          EventRegister.emit('changeTheme', appearanceTheme);
        }}
        color={theme.purple}
        uncheckedColor={theme.dark}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setAppearanceTheme(value);
          EventRegister.emit('changeTheme', appearanceTheme);
        }}
      >
        <Text
          style={
            appearanceTheme === value
              ? [styles.radiobuttonItemTextSelected, { color: theme.purple }]
              : [styles.radiobuttonItemTextUnselected, { color: theme.gray }]
          }
        >
          {value === 'light' ? 'Claro' : 'Oscuro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioBtn;

const styles = StyleSheet.create({
  radiobuttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiobuttonItemTextSelected: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
  },
  radiobuttonItemTextUnselected: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
  },
});
