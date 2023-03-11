import { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import themeContext from '../context/themeContext';

const InfoAvailability = ({ label, content, setContent, error }) => {
  const theme = useContext(themeContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const monthNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    if (label === 'Fecha') {
      const currentDate = date;
      setContent(
        `${currentDate.getDate()} ${
          monthNames[currentDate.getMonth()]
        } ${new Date().getFullYear()}`
      );
    } else {
      const currentTime = date.toString().split(' ')[4];
      let currentHour = currentTime.toString().split(':')[0];
      let currentMin = currentTime.toString().split(':')[1];
      let timeZone = '';
      if (currentHour < 12) {
        timeZone = 'am';
      } else {
        timeZone = 'pm';
        if (currentHour > 12) {
          currentHour = currentHour - 12;
        }
      }

      setContent(`${currentHour}:${currentMin}${timeZone}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {label !== 'Piso' ? (
        <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
          <View
            style={[
              styles.infoContentWrapper,
              { backgroundColor: theme.white },
            ]}
          >
            <TextInput
              value={content}
              style={[
                styles.infoContent,
                label !== 'Fecha' && error
                  ? { color: theme.red }
                  : { color: theme.dark },
              ]}
              onPressIn={showDatePicker}
              caretHidden={true}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={[styles.infoContentWrapper, { backgroundColor: theme.white }]}
        >
          <RNPickerSelect
            onValueChange={(value) => {
              setContent(value);
            }}
            items={[
              { label: '1', value: '1', key: '1' },
              { label: '2', value: '2', key: '2' },
              { label: '3', value: '3', key: '3' },
            ]}
            value={content}
            style={{
              inputAndroid: {
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                letterSpacing: 0.6,
                lineHeight: 18,
                color: theme.dark,
              },
              inputIOS: {
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                letterSpacing: 0.6,
                lineHeight: 18,
                color: theme.dark,
              },
            }}
            placeholder={{
              key: '1',
              value: null,
            }}
          />
        </View>
      )}

      <DateTimePickerModal
        isVisible={label === 'Fecha' ? false : isDatePickerVisible}
        mode={label === 'Fecha' ? 'date' : 'time'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default InfoAvailability;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    maxWidth: 150,
  },
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginBottom: 4,
  },
  infoContentWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
  },
  infoContent: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 18,
  },
});
