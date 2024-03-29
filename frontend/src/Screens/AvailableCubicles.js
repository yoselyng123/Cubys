import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
/* Assets */
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import dayjs from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';
import useToastMessage from '../hooks/useToastMessage';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';
import Map from '../components/Map';
import AvailabilityLeyend from '../components/AvailabilityLeyend';
/* APOLLO SERVER */
import { useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_DATE } from '../hooks/queries';

const AvailableCubicles = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { cubiclesList, user, myReservations, setCubiclesList } =
    useContext(userContext);
  const { showToast } = useToastMessage();
  const myInterval = useRef();

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

  /* V A L I D A T I O N S */
  const inputValidation = () => {
    if (startTime === endTime) {
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'La hora de entrada no puede ser igual a la hora de salida.',
      });
      setError(true);
      return false;
    }

    return (
      outOfWorkingHoursValidation() &&
      endTimeHigherThanStartTime() &&
      twoHoursMaxValidation() &&
      startTimeBeforeCurrentTime()
    );
  };

  const outOfWorkingHoursValidation = () => {
    // Validate reservation is in working hours
    if (
      parseMilitarHoursFormat(endTime) > 1700 ||
      parseMilitarHoursFormat(startTime) > 1700
    ) {
      setError(true);
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'La biblioteca abre de 7:00am a 5:00pm',
      });
      return false;
    } else if (
      parseMilitarHoursFormat(endTime) < 700 ||
      parseMilitarHoursFormat(startTime) < 700
    ) {
      setError(true);
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'La biblioteca abre de 7:00am a 5:00pm',
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
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'El tiempo máximo de reserva son 2 horas.',
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
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'La hora de entrada debe ser mayor a la hora de salida.',
      });
      return false;
    }
    return true;
  };

  const startTimeBeforeCurrentTime = () => {
    if (
      parseInt(parseMilitarHoursFormat(startTime)) <
      parseInt(parseMilitarHoursFormat(dayjs().format('h:mma')))
    ) {
      setError(true);
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'La hora de entrada debe ser mayor o igual a la hora actual.',
      });
      return false;
    }
    return true;
  };

  const checkCubiclesAvailability = () => {
    var newCubiclesList = [...cubiclesList];
    if (!loadingReservations && date && startTime && endTime) {
      for (let c = 0; c < newCubiclesList.length; c++) {
        const cubicle = newCubiclesList[c];
        if (dataReservations.getReservationsByDate.length === 0) {
          newCubiclesList[c].availability = true;
          setCubiclesList(newCubiclesList);
        }
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
              setCubiclesList(newCubiclesList);
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
              setCubiclesList(newCubiclesList);
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
              setCubiclesList(newCubiclesList);
            } else {
              newCubiclesList[c].availability = true;
              setCubiclesList(newCubiclesList);
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
    checkCubiclesAvailability();
    cubiclesList.map((cubicle) => {
      cubicle.isSelected = false;
    });
  }, []);

  // When component Mounts and Unmounts from navigation
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      refetchReservations({ date });
      myInterval.current = setInterval(() => {
        setStartTime(dayjs().format('h:mma'));
        setEndTime(dayjs().add(2, 'hour').format('h:mma'));
        checkCubiclesAvailability();
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
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'Ya tiene una reservación activa.',
      });
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
          showToast({
            type: 'errorToast',
            title: 'Error',
            message:
              'El cubículo se encuentra ocupado en el bloque de hora seleccionado.',
          });
        }
      }
    } else {
      showToast({
        type: 'errorToast',
        title: 'Error',
        message: 'Debe seleccionar un cubículo para continuar.',
      });
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
      <ScrollView contentContainerStyle={styles.contentWrapper}>
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
              selectedCubicle={selectedCubicle}
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
              <View
                style={[styles.btnConfirm, { backgroundColor: theme.purple }]}
              >
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
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  infoLeftWrapper: {
    flex: 1,
    marginRight: '10%',
  },
  infoRightWrapper: {
    flex: 1,
    marginRight: '10%',
  },
  footer: {
    flex: 1,
    marginBottom: 40,
    justifyContent: 'flex-end',
  },
  btnConfirm: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8%',
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
