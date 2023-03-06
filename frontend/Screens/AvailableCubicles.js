import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
/* Assets */
import colors from '../assets/colors';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import dayjs from 'dayjs';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';
import CubicleMomentaneo from '../components/CubicleMomentaneo';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';
import Map from '../components/Map';

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

  const myInterval = useRef();

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

  /* V A L I D A T I O N S */
  const inputValidation = () => {
    if (startTime === endTime) {
      showMessage({
        message: 'Error',
        description:
          'La hora de entrada no puede ser igual a la hora de salida.',
        type: 'danger',
        duration: '2000',

        icon: () => (
          <MaterialIcons
            name='cancel'
            size={38}
            color='#FF9B9D'
            style={{ paddingRight: 20 }}
          />
        ),
      });
      setError(true);
      return false;
    }

    return (
      outOfWorkingHoursValidation() &&
      endTimeHigherThanStartTime() &&
      twoHoursMaxValidation()
    );
  };

  const outOfWorkingHoursValidation = () => {
    // Validate reservation is in working hours
    if (
      parseInt(parseMilitarHoursFormat(endTime)) > 1700 ||
      parseInt(parseMilitarHoursFormat(startTime)) > 1700
    ) {
      setError(true);
      showMessage({
        message: 'Error',
        description: 'La biblioteca abre de 7:00am a 5:00pm',
        type: 'danger',
        duration: '2000',

        icon: () => (
          <MaterialIcons
            name='cancel'
            size={38}
            color='#FF9B9D'
            style={{ paddingRight: 20 }}
          />
        ),
      });
      return false;
    } else if (
      parseInt(parseMilitarHoursFormat(endTime) < 700) ||
      parseInt(parseMilitarHoursFormat(startTime)) < 700
    ) {
      setError(true);
      showMessage({
        message: 'Error',
        description: 'La biblioteca abre de 7:00am a 5:00pm',
        type: 'danger',
        duration: '2000',

        icon: () => (
          <MaterialIcons
            name='cancel'
            size={38}
            color='#FF9B9D'
            style={{ paddingRight: 20 }}
          />
        ),
      });
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
      showMessage({
        message: 'Error',
        description: 'El tiempo máximo de reserva son 2 horas.',
        type: 'danger',
        duration: '2000',

        icon: () => (
          <MaterialIcons
            name='cancel'
            size={38}
            color='#FF9B9D'
            style={{ paddingRight: 20 }}
          />
        ),
      });
      setError(true);
      return false;
    }
    return true;
  };

  const endTimeHigherThanStartTime = () => {
    if (
      parseInt(parseMilitarHoursFormat(endTime)) <
      parseInt(parseMilitarHoursFormat(startTime))
    ) {
      setError(true);
      showMessage({
        message: 'Error',
        description: 'La hora de entrada debe ser mayor a la hora de salida.',
        type: 'danger',
        duration: '2000',

        icon: () => (
          <MaterialIcons
            name='cancel'
            size={38}
            color='#FF9B9D'
            style={{ paddingRight: 20 }}
          />
        ),
      });
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
              (parseInt(parseMilitarHoursFormat(startTime)) >=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
                parseInt(parseMilitarHoursFormat(startTime)) <=
                  parseInt(parseMilitarHoursFormat(reservation.endTime))) ||
              (parseInt(parseMilitarHoursFormat(endTime)) >=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
                parseInt(parseMilitarHoursFormat(endTime)) <=
                  parseInt(parseMilitarHoursFormat(reservation.endTime)))
            ) {
              newCubiclesList[c].availability = false;
              setFilteredCubicles(newCubiclesList);
            } else if (
              parseInt(parseMilitarHoursFormat(startTime)) <=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
              parseInt(parseMilitarHoursFormat(startTime)) <=
                parseInt(parseMilitarHoursFormat(reservation.endTime)) &&
              parseInt(parseMilitarHoursFormat(endTime)) >=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
              parseInt(parseMilitarHoursFormat(endTime)) <=
                parseInt(parseMilitarHoursFormat(reservation.endTime))
            ) {
              newCubiclesList[c].availability = false;
              setFilteredCubicles(newCubiclesList);
            } else if (
              parseInt(parseMilitarHoursFormat(startTime)) <=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
              parseInt(parseMilitarHoursFormat(startTime)) <=
                parseInt(parseMilitarHoursFormat(reservation.endTime)) &&
              parseInt(parseMilitarHoursFormat(endTime)) >=
                parseInt(parseMilitarHoursFormat(reservation.startTime)) &&
              parseInt(parseMilitarHoursFormat(endTime)) >=
                parseInt(parseMilitarHoursFormat(reservation.endTime))
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
    setStartTime(dayjs().format('h:mma'));
    setEndTime(dayjs().add(2, 'hour').format('h:mma'));
    // var intervalID = setInterval(() => {
    //   setStartTime(dayjs().format('h:mma'));
    //   setEndTime(dayjs().add(2, 'hour').format('h:mma'));
    // }, 1000 * 10);
    // refetchReservations({ date });
    // checkCubiclesAvailability();
    // return () => {
    //   clearInterval(intervalID);
    // };
  }, []);

  // When component Mounts and Unmounts from navigation
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      myInterval.current = setInterval(() => {
        setStartTime(dayjs().format('h:mma'));
        setEndTime(dayjs().add(2, 'hour').format('h:mma'));
      }, 1000 * 10);
      return () => {
        // Do something when the screen is blurred
        clearInterval(myInterval.current);
      };
    }, [])
  );

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
        title='Cubículos Disponibles'
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
        {/* MAP */}
        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {loadingReservations ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size='small' color={theme.dark} />
            </View>
          ) : (
            <Map
              floor={floor}
              resInfo={{
                date,
                startTime,
                endTime,
                floor,
              }}
              inputValidation={inputValidation}
              navigation={navigation}
            />
          )}
        </View>

        {!loadingReservations && (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                //handleSignIn();
              }}
            >
              <View style={styles.btnConfirm}>
                <Text style={styles.textConfirm}>Confirmar</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.leyendWrapper}>
              <View style={styles.leyendContainer}>
                <Text style={[styles.leyendText, { color: theme.gray }]}>
                  Disponible
                </Text>
                <View
                  style={[styles.leyendColor, { backgroundColor: theme.green }]}
                />
              </View>
              <View style={styles.leyendContainer}>
                <Text style={[styles.leyendText, { color: theme.gray }]}>
                  Ocupado
                </Text>
                <View
                  style={[styles.leyendColor, { backgroundColor: theme.red }]}
                />
              </View>
            </View>
          </>
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
  leyendWrapper: {
    marginTop: '10%',
    alignSelf: 'flex-end',
  },
  leyendContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    marginBottom: 5,
  },
  leyendColor: {
    height: 8,
    width: 8,
    borderRadius: '50%',
  },
  leyendText: {
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
    marginRight: 6,
  },
  btnConfirm: {
    borderRadius: 10,
    backgroundColor: colors.purple,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textConfirm: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
});
