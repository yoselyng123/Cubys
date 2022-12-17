import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
/* Assets */
import colors from '../assets/colors';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import dayjs from 'dayjs';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';
import CubicleMomentaneo from '../components/CubicleMomentaneo';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';

const GET_RESERVATIONS = gql`
  query getAllReservations {
    getAllReservations {
      id
      startTime
      endTime
      date
      cubicleID
      companions {
        name
        carrera
        carnet
      }
      completed
    }
  }
`;
const GET_RESERVATIONS_BY_DATE = gql`
  query getReservationsByDate($date: String!) {
    getReservationsByDate(date: $date) {
      id
      startTime
      endTime
      date
      cubicleID
      companions {
        carnet
        carrera
        name
      }
      completed
    }
  }
`;

const AvailableCubicles = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { cubiclesList } = useContext(userContext);

  const [filteredCubicles, setFilteredCubicles] = useState(cubiclesList);
  const [date, setDate] = useState(dayjs().locale('es').format('DD MMM YYYY'));
  const [startTime, setStartTime] = useState(dayjs().format('h:mma'));
  const [endTime, setEndTime] = useState(
    dayjs().add(2, 'hour').format('h:mma')
  );
  const [floor, setFloor] = useState('1');
  const [error, setError] = useState(false);

  /* Q U E R Y S */
  // const {
  //   loading: loadingReservations,
  //   error: errorReservations,
  //   data: dataReservations,
  //   refetch: refetchReservations,
  // } = useQuery(GET_RESERVATIONS);

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
    refetch: refetchReservations,
  } = useQuery(GET_RESERVATIONS_BY_DATE, {
    variables: { date },
    pollInterval: 10000,
  });

  /* U T I L I T I E S */

  const parseMilitarHoursFormat = (hour) => {
    var newHour = hour.split(':')[0];
    if (hour.split(':')[1].substring(2, 4) === 'pm') {
      if (newHour === '12') {
        newHour = Number(newHour);
      } else {
        newHour = Number(newHour) + 12;
      }
    }
    var minutes = hour.split(':')[1].slice(0, 2);

    return newHour + minutes;
  };

  // const filterByFloor = (itemsList) => {
  //   var copyOfItemList = [...itemsList];
  //   const result = copyOfItemList.filter((item) => {
  //     if (item.floor === floor) {
  //       return item;
  //     }
  //   });
  //   for (let i = 0; i < result.length; i++) {
  //     result[i] = { ...result[i], availability: true };
  //   }

  //   return result;
  // };

  /* V A L I D A T I O N S */
  const inputValidation = () => {
    if (startTime === endTime) {
      Alert.alert('La hora de entrada no puede ser igual a la hora de salida.');
      setError(true);
      return false;
    }

    return (
      // outOfWorkingHoursValidation() &&
      endTimeHigherThanStartTime() && twoHoursMaxValidation()
    );
  };

  const outOfWorkingHoursValidation = () => {
    // Validate reservation is in working hours
    if (
      parseInt(parseMilitarHoursFormat(endTime)) > 1700 ||
      parseInt(parseMilitarHoursFormat(startTime)) > 1700
    ) {
      setError(true);
      Alert.alert('Error. La biblioteca abre de 7:00am a 5:00pm');
      return false;
    } else if (
      parseInt(parseMilitarHoursFormat(endTime) < 700) ||
      parseInt(parseMilitarHoursFormat(startTime)) < 700
    ) {
      setError(true);
      Alert.alert('Error. La biblioteca abre de 7:00am a 5:00pm');
      return false;
    }

    return true;
  };

  const twoHoursMaxValidation = () => {
    let quantity = Math.abs(
      parseInt(parseMilitarHoursFormat(endTime)) -
        parseInt(parseMilitarHoursFormat(startTime))
    );

    if (quantity > 200) {
      Alert.alert('El tiempo máximo de reserva son 2 horas.');
      setError(true);
      return false;
    }
    return true;
  };

  const endTimeHigherThanStartTime = () => {
    if (parseMilitarHoursFormat(endTime) < parseMilitarHoursFormat(startTime)) {
      setError(true);
      Alert.alert('La hora de entrada debe ser mayor a la hora de salida.');
      return false;
    }
    return true;
  };

  const checkCubiclesAvailability = () => {
    var newCubiclesList = [...filteredCubicles];

    if (!loadingReservations && date && startTime && endTime) {
      for (let c = 0; c < newCubiclesList.length; c++) {
        const cubicle = newCubiclesList[c];
        for (
          let r = 0;
          r < dataReservations.getReservationsByDate.length;
          r++
        ) {
          const reservation = dataReservations.getReservationsByDate[r];
          if (reservation.cubicleID === cubicle.id && !reservation.completed) {
            if (
              (parseMilitarHoursFormat(startTime) >=
                parseMilitarHoursFormat(reservation.startTime) &&
                parseMilitarHoursFormat(startTime) <=
                  parseMilitarHoursFormat(reservation.endTime)) ||
              (parseMilitarHoursFormat(endTime) >=
                parseMilitarHoursFormat(reservation.startTime) &&
                parseMilitarHoursFormat(endTime) <=
                  parseMilitarHoursFormat(reservation.endTime))
            ) {
              newCubiclesList[c].availability = false;
              setFilteredCubicles(newCubiclesList);
            } else if (
              parseMilitarHoursFormat(startTime) <=
                parseMilitarHoursFormat(reservation.startTime) &&
              parseMilitarHoursFormat(startTime) <=
                parseMilitarHoursFormat(reservation.endTime) &&
              parseMilitarHoursFormat(endTime) >=
                parseMilitarHoursFormat(reservation.startTime) &&
              parseMilitarHoursFormat(endTime) <=
                parseMilitarHoursFormat(reservation.endTime)
            ) {
              newCubiclesList[c].availability = false;
              setFilteredCubicles(newCubiclesList);
            } else if (
              parseMilitarHoursFormat(startTime) <=
                parseMilitarHoursFormat(reservation.startTime) &&
              parseMilitarHoursFormat(startTime) <=
                parseMilitarHoursFormat(reservation.endTime) &&
              parseMilitarHoursFormat(endTime) >=
                parseMilitarHoursFormat(reservation.startTime) &&
              parseMilitarHoursFormat(endTime) >=
                parseMilitarHoursFormat(reservation.endTime)
            ) {
              newCubiclesList[c].availability = false;
              setFilteredCubicles(newCubiclesList);
            } else {
              newCubiclesList[c].availability = true;
              setFilteredCubicles(newCubiclesList);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (dataReservations) {
      refetchReservations({ date });
      checkCubiclesAvailability();
    }
  }, [dataReservations]);

  useEffect(() => {
    setInterval(() => {
      setStartTime(dayjs().format('h:mma'));
      setEndTime(dayjs().add(2, 'hour').format('h:mma'));
    }, 1000 * 60);
    refetchReservations({ date });
    checkCubiclesAvailability();
    return () => {
      clearInterval(startTime);
      clearInterval(endTime);
      setStartTime('');
      setEndTime('');
    };
  }, []);

  useEffect(() => {
    setError(false);
    checkCubiclesAvailability();
  }, [startTime, endTime]);

  useEffect(() => {
    checkCubiclesAvailability();
  }, [floor]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
        {loadingReservations ? (
          <Text>Loading...</Text>
        ) : (
          filteredCubicles.map((cubicle, index) => {
            if (cubicle.floor === floor) {
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
            } else {
              return null;
            }
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
