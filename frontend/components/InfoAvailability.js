import { useState } from 'react';
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

const InfoAvailability = ({ label, content, setContent }) => {
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
        } ${currentDate.getFullYear()}`
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
          <View style={styles.infoContentWrapper}>
            <TextInput
              value={content}
              style={styles.infoContent}
              onPressIn={showDatePicker}
              caretHidden={true}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.infoContentWrapper}>
          <RNPickerSelect
            onValueChange={(value) => {
              setContent(value);
            }}
            items={[
              { label: 'Primero', value: 'Primero', key: 'Primero' },
              { label: 'Segundo', value: 'Segundo', key: 'Segundo' },
              { label: 'Tercero', value: 'Tercero', key: 'Tercero' },
            ]}
            value={content}
            style={{
              inputAndroid: {
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                letterSpacing: 0.6,
                lineHeight: 18,
              },
              inputIOS: {
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                letterSpacing: 0.6,
                lineHeight: 18,
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
        isVisible={isDatePickerVisible}
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
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  infoContent: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 18,
  },
});
