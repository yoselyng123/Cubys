import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
/* Assets */
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
import dayjs from 'dayjs';
import { es } from 'dayjs/locale/es';
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
    getReservationsByStatus(completed: $completed) {
      id
      startTime
      endTime
      date
      cubicleID
      completed
      createdBy
      companions {
        name
        carrera
        carnet
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

const Home = ({ navigation }) => {
  const [pressedCancel, setPressedCancel] = useState(false);
  const [reservedNumber, setReservedNumber] = useState(0);
  const [availableCubicles, setAvailableCubicles] = useState(0);
  const [historialCount, setHistorialCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());
  //const [currentTime, setCurrentTime] = useState(dayjs().format('hh:mma'));

  // TODO TRAER TODAS LAS RESERVACIONES EN TRUE Y EN FALSE DEL USUARIO
  // REVISAR LAS QUE ESTAN EN FALSE PARA SABER SI YA ESTAN VENCIDAS
  // REVISAR GETMYRESERVATIONS
  const { setMyReservations, myReservations, setCubiclesList } =
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
      setMyReservations([]);
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
    if (myReservations.length > 0) {
      var emptyArray = [];
      for (let r = 0; r < myReservations.length; r++) {
        const reservation = myReservations[r];
        // FIXME: REVISAR NUNCA ENTRA A ENTRO AQUI
        // Siempre cae en el caso Cambio a True, fechas diferentes
        if (
          reservation.date === currentDate.locale('es').format('DD MMM YYYY') &&
          parseMilitarHoursFormat(currentDate.format('h:mma')) >
            parseMilitarHoursFormat(reservation.endTime) &&
          !reservation.completed
        ) {
          setMyReservations(emptyArray);
          updateReservationStatus({
            variables: { id: reservation.id, completed: true },
          });
        } else if (
          reservation.date !== currentDate.locale('es').format('DD MMM YYYY') &&
          !reservation.completed
        ) {
          updateReservationStatus({
            variables: { id: reservation.id, completed: true },
          });
          setMyReservations(emptyArray);
        }
      }
    }
  };

  useEffect(() => {
    if (dataReservationsFalse) {
      setMyReservations(dataReservationsFalse.getReservationsByStatus);
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
    if (dataReservationsTrue) {
      setHistorialCount(dataReservationsTrue.getReservationsByStatus.length);
    }
  }, [dataReservationsTrue]);

  const [updateReservationStatus, { data: dataUpdateReservationStatus }] =
    useMutation(UPDATE_RESERVATION_STATUS);

  useEffect(() => {
    if (dataUpdateReservationStatus) {
      setMyReservations([]);
      refetchReservationsTrue();
    }
  }, [dataUpdateReservationStatus]);

  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
  } = useQuery(GET_CUBICLES, {
    onCompleted: (data) => {
      setAvailableCubicles(data.getCubicles.length);
    },
  });

  useEffect(() => {
    if (dataCubicles) {
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
    checkIfCompleted();
  }, [myReservations]);

  useEffect(() => {
    checkIfCompleted();
  }, [currentDate]);

  return (
    <View style={styles.container}>
      <Header title='cubys' navigateAvailable={false} />
      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContainer}>
          <Text style={styles.greetingsTitle}>Hola</Text>
          <Text style={styles.greetingsText}>
            Reserva un cubículo cuando quieras.
          </Text>
          {/* Cards */}
          <CardsList
            navigation={navigation}
            reservedNumber={myReservations.length}
            availableCubicles={availableCubicles}
            loadingCubicles={loadingCubicles}
            historialCount={historialCount}
          />
          {/* Separation Line */}
          <SectionDivider marginBottom={20} />
          <Text style={styles.reservationsTitle}>Próximas Reservaciones</Text>
          {loadingReservationsFalse ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size='small' color='#FFF' />
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
            <Text style={styles.noReservationsText}>No hay reservaciones</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
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
