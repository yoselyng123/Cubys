import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
/* Assets */
import colors from '../assets/colors';
import CubicleMomentaneo from '../components/CubicleMomentaneo';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      id
      sala
      floor
      cubicleNumber
      maxCapacity
      minCapacity
      availability
    }
  }
`;

const AvailableCubicles = ({ navigation }) => {
  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
  } = useQuery(GET_CUBICLES);

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [floor, setFloor] = useState('Primero');
  const [error, setError] = useState(false);

  useEffect(() => {
    let month = new Date().toString().split(' ')[1];
    let day = new Date().toString().split(' ')[2];
    let year = new Date().toString().split(' ')[3];
    let hour = new Date().toString().split(' ')[4].split(':')[0];
    let min = new Date().toString().split(' ')[4].split(':')[0];
    let timeZone = '';
    if (hour < 12) {
      timeZone = 'am';
    } else {
      timeZone = 'pm';
      if (hour > 12) {
        hour = hour - 12;
      }
    }

    let endTimeNumber = parseInt(hour) + 2;
    setStartTime(`${hour}:${min}${timeZone}`);
    setEndTime(`${endTimeNumber}:${min}${timeZone}`);
    setDate(`${day} ${month} ${year}`);
  }, []);

  useEffect(() => {
    setError(false);
  }, [startTime, endTime]);

  if (errorCubicles) return Alert.alert(`Error! ${errorCubicles.message}`);

  const inputValidation = () => {
    return outOfWorkingHoursValidation() && twoHoursMaxValidation();
  };

  const outOfWorkingHoursValidation = () => {
    // Validate reservation is in working hours
    let lessThan7AM =
      (startTime.split(':')[1].substring(2, 4) === 'am' &&
        startTime.split(':')[0] < 7) ||
      (endTime.split(':')[1].substring(2, 4) === 'am' &&
        endTime.split(':')[0] < 7);
    let greaterThan5PM =
      (endTime.split(':')[1].substring(2, 4) === 'pm' &&
        endTime.split(':')[0] > 5) ||
      (startTime.split(':')[1].substring(2, 4) === 'pm' &&
        startTime.split(':')[0] > 5);
    let equalTo5PMButMoreMinutes =
      (endTime.split(':')[1].substring(2, 4) === 'pm' &&
        endTime.split(':')[0] >= 5 &&
        endTime.split(':')[1].substring(0, 2) > 0) ||
      (startTime.split(':')[1].substring(2, 4) === 'pm' &&
        startTime.split(':')[0] >= 5 &&
        startTime.split(':')[1].substring(0, 2) > 0);
    if (
      !(
        (startTime.split(':')[0] === '12' || endTime.split(':')[0] === '12') &&
        (startTime.split(':')[1].substring(2, 4) === 'pm' ||
          endTime.split(':')[1].substring(2, 4) === 'pm')
      )
    ) {
      if (lessThan7AM || greaterThan5PM || equalTo5PMButMoreMinutes) {
        Alert.alert('Error. La biblioteca abre de 7:00am a 5:00pm');
        setError(true);
        return false;
      }
    }

    return true;
  };

  const twoHoursMaxValidation = () => {
    // Validate Reservation time is less or equal to 2 hours
    let bothAM =
      startTime.split(':')[1].substring(2, 4) === 'am' &&
      endTime.split(':')[1].substring(2, 4) === 'am';
    let bothPM =
      startTime.split(':')[1].substring(2, 4) === 'pm' &&
      endTime.split(':')[1].substring(2, 4) === 'pm';

    if (startTime.split(':')[0] === '12') {
      let quantity = endTime.split(':')[0];
      if (quantity > 2) {
        Alert.alert('Error. El tiempo maximo de reserva son 2 horas.');
        setError(true);
        return false;
      }
    } else if (endTime.split(':')[0] === '12') {
      let quantity = startTime.split(':')[0];

      if (quantity > 2) {
        Alert.alert('Error. El tiempo maximo de reserva son 2 horas.');
        setError(true);
        return false;
      }
    } else {
      let quantity = endTime.split(':')[0] - startTime.split(':')[0];

      if (quantity > 2 && (bothAM || bothPM)) {
        Alert.alert('Error. El tiempo maximo de reserva son 2 horas.');
        setError(true);
        return false;
      }
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Available Cubicles'
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.infoLeftWrapper}>
            <InfoAvailability
              label='Fecha'
              content={date}
              setContent={setDate}
            />
            <InfoAvailability
              label='Hora de Entrada'
              content={startTime}
              setContent={setStartTime}
              error={error}
            />
          </View>
          <View>
            <InfoAvailability
              label='Piso'
              content={floor}
              setContent={setFloor}
            />
            <InfoAvailability
              label='Hora de Salida'
              content={endTime}
              setContent={setEndTime}
              error={error}
            />
          </View>
        </View>
        {/* Map goes here */}
        {loadingCubicles ? (
          <Text>Loading...</Text>
        ) : (
          dataCubicles.getCubicles.map((cubicle, index) => {
            return (
              <CubicleMomentaneo
                key={index}
                cubicle={cubicle}
                navigation={navigation}
                resInfo={{
                  date,
                  startTime,
                  endTime,
                  floor,
                }}
                inputValidation={inputValidation}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default AvailableCubicles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLeftWrapper: {
    marginRight: '15%',
  },
});
