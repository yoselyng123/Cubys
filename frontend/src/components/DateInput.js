import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/* ASSETS */
import colors from '../assets/colors';

const DateInput = ({ title, placeholder }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const [day, setDay] = React.useState('27');
  const [month, setMonth] = React.useState('February');
  const [year, setYear] = React.useState('2001');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();

    const currentDate = date;

    setDay(currentDate.getDate());

    setMonth(monthNames[currentDate.getMonth()]);

    setYear(currentDate.getFullYear());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
          <Text style={styles.changedate}>Change Date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.inputDay}>
          <Text style={styles.datetext}>{day}</Text>
        </View>
        <View style={styles.inputMonth}>
          <Text style={styles.datetext}>{month}</Text>
        </View>
        <View style={styles.inputYear}>
          <Text style={styles.datetext}>{year}</Text>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 45,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.gray,
  },
  changedate: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.purple,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputYear: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  inputMonth: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  inputDay: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  datetext: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
  },
});
