import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
/* Assets */
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
import dayjs from 'dayjs';
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import CardsList from '../components/CardsList';
/* APOLLO SERVER */
import { useQuery, useMutation, gql } from '@apollo/client';
import SectionDivider from '../components/SectionDivider';

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      id
      sala
      cubicleNumber
      floor
    }
  }
`;

const DELETE_RESERVATION_MUTATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

const GET_RESERVATIONS_BY_STATUS = gql`
  query getMyReservationsByStatus($completed: Boolean!) {
    getMyReservationsByStatus(completed: $completed) {
      id
      createdBy
      startTime
      endTime
      date
      cubicleID
      completed
      companions {
        carnet
        carrera
        name
      }
    }
  }
`;

const UPDATE_RESERVATION_STATUS = gql`
  mutation updateReservationStatus($id: ID!, $completed: Boolean!) {
    updateReservationStatus(id: $id, completed: $completed) {
      id
      createdBy
      startTime
      endTime
      date
      cubicleID
      completed
      companions {
        carnet
        carrera
        name
      }
    }
  }
`;

const GET_ALL_RESERVATIONS_BY_STATUS = gql`
  query getReservationsByStatus($completed: Boolean!) {
    getReservationsByStatus(completed: $completed) {
      id
      createdBy
      startTime
      endTime
      date
      cubicleID
      completed
      companions {
        carnet
        carrera
        name
      }
    }
  }
`;

const Home = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [pressedCancel, setPressedCancel] = useState(false);
  const [availableCubicles, setAvailableCubicles] = useState(0);
  const [historialCount, setHistorialCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservedNumber, setReservedNumber] = useState(0);

  const { setMyReservations, myReservations, setCubiclesList, user } =
    useContext(userContext);

  const [deleteReservation, { loading: loadingDeleteReservation }] =
    useMutation(DELETE_RESERVATION_MUTATION, {
      onCompleted: () => {
        setPressedCancel(false);
        Alert.alert('Se ha cancelado la reservación');
        //refetchAllReservations();
      },
      onError: () => {
        Alert.alert(
          'No se pudo cancelar la reservación. Por favor intente de nuevo'
        );
      },
    });

  useEffect(() => {
    if (!loadingDeleteReservation) {
      // TODO:
      // setMyReservations([]);
      // PUEDO HACER REFETCH O SIMPLEMENTE HACERLE POP DEL ARRAY
    }
  }, [loadingDeleteReservation]);

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
    if (dataReservationsTrueAdmin) {
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
    // TODO: Reconsider if maybe it's better to checkCompleted of ALL reservations
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
    if (user.role !== 'admin') {
      if (dataReservationsTrue) {
        setHistorialCount(
          dataReservationsTrue.getMyReservationsByStatus.length
        );
      }
    }
  }, [dataReservationsTrue]);

  const [updateReservationStatus, { data: dataUpdateReservationStatus }] =
    useMutation(UPDATE_RESERVATION_STATUS);

  useEffect(() => {
    if (dataUpdateReservationStatus) {
      // setMyReservations([]);
      refetchReservationsTrue();
      if (user.role === 'admin') {
        refetchReservationsFalse();
        refetchReservationsFalseAdmin();
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
        };
      }
      setCubiclesList(copyOfCubicles);
    }
  }, [dataCubicles]);

  if (errorCubicles) return Alert.alert(`Error! ${errorCubicles.message}`);

  useEffect(() => {
    refetchReservationsFalse();
    refetchReservationsTrue();
    refetchReservationsFalseAdmin();

    setInterval(() => {
      setCurrentDate(dayjs());
    }, 1000 * 60);
    return () => {
      clearInterval(currentDate);
      setCurrentDate('');
    };
  }, []);

  useEffect(() => {
    refetchReservationsFalse();
    if (user.role === 'admin') {
      refetchReservationsTrueAdmin();
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
    }
  }, [dataReservationsFalseAdmin]);

  if (user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header title='cubys' navigateAvailable={false} />
        <ScrollView
          style={styles.contentWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContainer}>
            <Text style={[styles.greetingsTitle, { color: theme.dark }]}>
              Hola
            </Text>
            <Text style={styles.greetingsText}>
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
                  <Reservation
                    key={index}
                    info={reservation}
                    id={reservation.cubicleID}
                    deleteReservation={deleteReservation}
                    pressedCancel={pressedCancel}
                  />
                );
              })
            ) : (
              <Text style={styles.noReservationsText}>
                No hay reservaciones
              </Text>
            )}
          </View>
        </ScrollView>
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
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 28,
    paddingBottom: 90,
  },
  greetingsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    letterSpacing: 0.6,
    lineHeight: 32.8,
    color: colors.dark,
    marginBottom: 7,
  },
  greetingsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
  },
  reservationsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.dark,
    marginBottom: 20,
  },
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginLeft: 10,
  },
});
