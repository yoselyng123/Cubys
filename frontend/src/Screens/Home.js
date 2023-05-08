import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
/* Assets */
import { userContext } from '../context/userContext';
import dayjs from 'dayjs';
import themeContext from '../context/themeContext';
import { useFocusEffect } from '@react-navigation/native';
import useToastMessage from '../hooks/useToastMessage';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import CardsList from '../components/CardsList';
import SectionDivider from '../components/SectionDivider';
import Loading from '../components/Loading';
import NoReservations from '../components/NoReservations';
/* APOLLO SERVER */
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_CUBICLES,
  GET_RESERVATIONS_BY_STATUS,
  GET_ALL_RESERVATIONS_BY_STATUS,
} from '../hooks/queries';
import {
  DELETE_RESERVATION_MUTATION,
  UPDATE_RESERVATION_STATUS,
} from '../hooks/mutations';

const Home = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { showToast } = useToastMessage();
  const myInterval = useRef();

  const [pressedCancel, setPressedCancel] = useState(false);
  const [availableCubicles, setAvailableCubicles] = useState(0);
  const [historialCount, setHistorialCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservedNumber, setReservedNumber] = useState(0);
  const [pressedDeletedIndex, setPressedDeletedIndex] = useState(null);

  const {
    setMyReservations,
    myReservations,
    setCubiclesList,
    user,
    setLockStatus,
    cubiclesList,
  } = useContext(userContext);

  const [deleteReservation, { loading: loadingDeleteReservation }] =
    useMutation(DELETE_RESERVATION_MUTATION, {
      onCompleted: () => {
        var myReservationsCopy = [...myReservations];
        setPressedCancel(false);
        showToast({
          type: 'infoToast',
          title: 'Info',
          message: 'Se ha cancelado la reservación con éxito.',
        });
        // var copyOfCubiclesList = [...cubiclesList];
        // cubiclesList.map((cubicle, index) => {
        //   if (
        //     cubicle.id === myReservationsCopy[pressedDeletedIndex].cubicleID
        //   ) {
        //     copyOfCubiclesList[index].availability = false;
        //   }
        // });
        // setCubiclesList(copyOfCubiclesList);
        myReservationsCopy.pop(pressedDeletedIndex);
        setMyReservations(myReservationsCopy);
        setLockStatus(false);
        //refetchReservations(); ?
        // TODO: CHECK QUE LA RESERVACION SE VE AUN ACTIVA EN EL MAPA A PESAR DE ELIMINARLA
      },
      onError: () => {
        showToast({
          type: 'errorToast',
          title: 'Error',
          message:
            'No se pudo cancelar la reservación. Por favor intente de nuevo.',
        });
      },
    });

  const {
    loading: loadingReservationsFalse,
    error: errorReservationsFalse,
    data: dataReservationsFalse,
    refetch: refetchReservationsFalse,
  } = useQuery(GET_RESERVATIONS_BY_STATUS, {
    variables: { completed: false },
  });

  const {
    loading: loadingReservationsTrueAdmin,
    error: errorReservationsTrueAdmin,
    data: dataReservationsTrueAdmin,
    refetch: refetchReservationsTrueAdmin,
  } = useQuery(GET_ALL_RESERVATIONS_BY_STATUS, {
    variables: { completed: true },
  });

  const {
    loading: loadingReservationsFalseAdmin,
    error: errorReservationsFalseAdmin,
    data: dataReservationsFalseAdmin,
    refetch: refetchReservationsFalseAdmin,
  } = useQuery(GET_ALL_RESERVATIONS_BY_STATUS, {
    variables: { completed: false },
  });

  useEffect(() => {
    if (dataReservationsTrueAdmin && user) {
      if (user.role === 'admin') {
        setHistorialCount(
          dataReservationsTrueAdmin.getReservationsByStatus.length
        );
      }
    }
  }, [dataReservationsTrueAdmin]);

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

  const checkIfCompleted = () => {
    if (user) {
      if (user.role === 'admin') {
        if (!loadingReservationsFalseAdmin) {
          for (
            let r = 0;
            r < dataReservationsFalseAdmin.getReservationsByStatus.length;
            r++
          ) {
            const reservation =
              dataReservationsFalseAdmin.getReservationsByStatus[r];
            if (
              reservation.date ===
                currentDate.locale('es').format('DD MMM YYYY') &&
              parseInt(parseMilitarHoursFormat(currentDate.format('h:mma'))) >
                parseInt(parseMilitarHoursFormat(reservation.endTime)) &&
              !reservation.completed
            ) {
              updateReservationStatus({
                variables: { id: reservation.id, completed: true },
              });
            } else if (
              reservation.date !==
                currentDate.locale('es').format('DD MMM YYYY') &&
              !reservation.completed
            ) {
              updateReservationStatus({
                variables: { id: reservation.id, completed: true },
              });
            }
          }
        }
      } else {
        if (myReservations.length > 0) {
          for (let r = 0; r < myReservations.length; r++) {
            const reservation = myReservations[r];
            if (
              reservation.date ===
                currentDate.locale('es').format('DD MMM YYYY') &&
              parseInt(parseMilitarHoursFormat(currentDate.format('h:mma'))) >
                parseInt(parseMilitarHoursFormat(reservation.endTime)) &&
              !reservation.completed
            ) {
              updateReservationStatus({
                variables: { id: reservation.id, completed: true },
              });
            } else if (
              reservation.date !==
                currentDate.locale('es').format('DD MMM YYYY') &&
              !reservation.completed
            ) {
              updateReservationStatus({
                variables: { id: reservation.id, completed: true },
              });
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (dataReservationsFalse) {
      setMyReservations(dataReservationsFalse.getMyReservationsByStatus);
      checkIfCompleted();
    }
  }, [dataReservationsFalse]);

  const {
    loading: loadingReservationsTrue,
    error: errorReservationsTrue,
    data: dataReservationsTrue,
    refetch: refetchReservationsTrue,
  } = useQuery(GET_RESERVATIONS_BY_STATUS, {
    variables: { completed: true },
  });

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        if (dataReservationsTrue) {
          setHistorialCount(
            dataReservationsTrue.getMyReservationsByStatus.length
          );
        }
      }
    }
  }, [dataReservationsTrue]);

  const [updateReservationStatus, { data: dataUpdateReservationStatus }] =
    useMutation(UPDATE_RESERVATION_STATUS);

  useEffect(() => {
    if (dataUpdateReservationStatus) {
      // setMyReservations([]);
      refetchReservationsTrue();
      if (user) {
        if (user.role === 'admin') {
          refetchReservationsFalse();
          refetchReservationsFalseAdmin();
        }
      }
    }
  }, [dataUpdateReservationStatus]);

  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
  } = useQuery(GET_CUBICLES);

  useEffect(() => {
    if (dataCubicles) {
      setAvailableCubicles(dataCubicles.getCubicles.length);
      const copyOfCubicles = [];
      for (let i = 0; i < dataCubicles.getCubicles.length; i++) {
        copyOfCubicles[i] = {
          ...dataCubicles.getCubicles[i],
          availability: true,
          isSelected: false,
        };
      }
      setCubiclesList(copyOfCubicles);
    }
  }, [dataCubicles]);

  if (errorCubicles) return Alert.alert(`Error! ${errorCubicles.message}`);

  useEffect(() => {
    refetchReservationsFalse();
    refetchReservationsTrue();
    if (user) {
      if (user.role === 'admin') {
        refetchReservationsFalseAdmin();
      }
    }
  }, []);

  // When component Mounts and Unmounts from navigation
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      myInterval.current = setInterval(() => {
        setCurrentDate(dayjs());
      }, 1000 * 10);
      return () => {
        // Do something when the screen is blurred
        clearInterval(myInterval.current);
      };
    }, [])
  );

  useEffect(() => {
    refetchReservationsFalse();
    if (user) {
      if (user.role === 'admin') {
        refetchReservationsTrueAdmin();
        refetchReservationsFalseAdmin();
      }
    }
    checkIfCompleted();
  }, [myReservations]);

  useEffect(() => {
    checkIfCompleted();
  }, [currentDate]);

  useEffect(() => {
    if (dataReservationsFalseAdmin) {
      setReservedNumber(
        dataReservationsFalseAdmin.getReservationsByStatus.length
      );
      checkIfCompleted();
    }
  }, [dataReservationsFalseAdmin]);

  if (user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title='cubys' navigateAvailable={false} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.greetingsTitle, { color: theme.dark }]}>
            Hola Unimetano,
          </Text>
          <Text style={[styles.greetingsText, { color: theme.gray }]}>
            Reserva un cubículo cuando quieras.
          </Text>
          {/* Cards */}

          <CardsList
            navigation={navigation}
            reservedNumber={
              user.role !== 'admin' ? myReservations.length : reservedNumber
            }
            availableCubicles={availableCubicles}
            loadingCubicles={loadingCubicles}
            historialCount={historialCount}
          />

          {/* Separation Line */}
          <SectionDivider marginBottom={20} />
          <Text style={[styles.reservationsTitle, { color: theme.dark }]}>
            Próximas Reservaciones
          </Text>
          {loadingReservationsFalse ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size='small' color={theme.dark} />
            </View>
          ) : myReservations.length > 0 ? (
            myReservations.map((reservation, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() =>
                    navigation.navigate('ReservationDetailsAdmin', {
                      reservation,
                    })
                  }
                >
                  <Reservation
                    info={reservation}
                    id={reservation.cubicleID}
                    deleteReservation={deleteReservation}
                    pressedCancel={pressedCancel}
                    setPressedDeletedIndex={setPressedDeletedIndex}
                    index={index}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <NoReservations />
          )}
        </ScrollView>
        <Loading show={loadingDeleteReservation} />
      </View>
    );
  } else {
    return null;
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 90,
  },
  greetingsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    letterSpacing: 0.6,
    lineHeight: 32.8,
    marginBottom: 7,
  },
  greetingsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 26,
  },
  reservationsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 26,
    marginBottom: 20,
  },
});
