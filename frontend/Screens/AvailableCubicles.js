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
import AvailabilityLeyend from '../components/AvailabilityLeyend';

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
  const { cubiclesList, user, myReservations } = useContext(userContext);

  const myInterval = useRef();

  const [filteredCubicles, setFilteredCubicles] = useState(cubiclesList);
  const [date, setDate] = useState(dayjs().locale('es').format('DD MMM YYYY'));
  const [startTime, setStartTime] = useState(dayjs().format('h:mma'));
  const [endTime, setEndTime] = useState(
    dayjs().add(2, 'hour').format('h:mma')
  );
  const [floor, setFloor] = useState('1');
  const [error, setError] = useState(false);
  const [selectedCubicle, setSelectedCubicle] = useState(null);

  /* Q U E R Y S */
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

  const errorMessage = (message) => {
    return showMessage({
      message: 'Error',
      description: message,
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
  };

  /* V A L I D A T I O N S */
  const inputValidation = () => {
    if (startTime === endTime) {
      errorMessage(
        'La hora de entrada no puede ser igual a la hora de salida.'
      );
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
      errorMessage('La biblioteca abre de 7:00am a 5:00pm');
      return false;
    } else if (
      parseInt(parseMilitarHoursFormat(endTime) < 700) ||
      parseInt(parseMilitarHoursFormat(startTime)) < 700
    ) {
      setError(true);
      errorMessage('La biblioteca abre de 7:00am a 5:00pm');
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
      errorMessage('El tiempo máximo de reserva son 2 horas.');
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
      errorMessage('La hora de entrada debe ser mayor a la hora de salida.');
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
  }, []);

  // When component Mounts and Unmounts from navigation
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      myInterval.current = setInterval(() => {
        setStartTime(dayjs().format('h:mma'));
        setEndTime(dayjs().add(2, 'hour').format('h:mma'));
      }, 1000 * 300);
      return () => {
        // Do something when the screen is blurred
        clearInterval(myInterval.current);
      };
    }, [])
  );

  // Check Cubicle Availability on change time
  useEffect(() => {
    setError(false);
    checkCubiclesAvailability();
  }, [startTime, endTime]);

  useEffect(() => {
    checkCubiclesAvailability();
  }, [floor]);

  const checkIfHasAnActiveReservation = () => {
    if (myReservations.length < 1) {
      return false;
    } else {
      errorMessage('Ya tiene una reservación activa.');
      return true;
    }
  };

  const handleForwardNavigation = (selectedCubicle) => {
    if (selectedCubicle) {
      if (inputValidation()) {
        if (selectedCubicle.availability) {
          navigation.navigate('ReservationDetails', {
            cubicleInfo: selectedCubicle,
            resInfo: {
              date,
              startTime,
              endTime,
              floor,
            },
          });
        } else {
          errorMessage(
            'El cubículo se encuentra ocupado en el bloque de hora seleccionado.'
          );
        }
      }
    } else {
      errorMessage('Debe seleccionar un cubículo para continuar.');
    }
  };

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
          <View style={styles.infoRightWrapper}>
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

        <View style={styles.mapContainer}>
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
              setSelectedCubicle={setSelectedCubicle}
            />
          )}
        </View>

        {!loadingReservations && (
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (user.role === 'admin') {
                  handleForwardNavigation(selectedCubicle);
                } else {
                  if (!checkIfHasAnActiveReservation()) {
                    handleForwardNavigation(selectedCubicle);
                  }
                }
              }}
            >
              <View style={styles.btnConfirm}>
                <Text style={styles.textConfirm}>Confirmar</Text>
              </View>
            </TouchableOpacity>
            <AvailabilityLeyend />
          </View>
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
    flex: 1,
    width: '100%',
    gap: '50%',
  },
  infoLeftWrapper: {
    flex: 1,
  },
  infoRightWrapper: {
    flex: 1,
    marginRight: '15%',
  },
  footer: {
    flex: 3,
    gap: '30%',
    marginBottom: 40,
  },
  btnConfirm: {
    borderRadius: 10,
    backgroundColor: colors.purple,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textConfirm: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
  mapContainer: {
    flex: 2,
  },
});
