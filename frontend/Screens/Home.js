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
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import CardsList from '../components/CardsList';
/* APOLLO SERVER */
import { useQuery, useMutation, gql } from '@apollo/client';
import SectionDivider from '../components/SectionDivider';

const GET_RESERVATIONS = gql`
  query getMyReservations {
    getMyReservations {
      id
      cubicleID
      createdBy
      startTime
      endTime
      date
      companions {
        name
        carrera
        carnet
      }
    }
  }
`;

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

const GET_ALL_RESERVATIONS = gql`
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
    }
  }
`;

const DELETE_RESERVATION_MUTATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

const Home = ({ navigation }) => {
  const [pressedCancel, setPressedCancel] = useState(false);
  const [reservedNumber, setReservedNumber] = useState(0);
  const [availableCubicles, setAvailableCubicles] = useState(0);

  const { setMyReservations, myReservations, setCubiclesList } =
    useContext(userContext);

  const [deleteReservation] = useMutation(DELETE_RESERVATION_MUTATION, {
    onCompleted: () => {
      setPressedCancel(false);
      setMyReservations([]);
      Alert.alert('Se ha cancelado la reservación');
      refetchReservations();
      //refetchAllReservations();
    },
    onError: () => {
      Alert.alert(
        'No se pudo cancelar la reservación. Por favor intente de nuevo'
      );
    },
  });

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
    refetch: refetchReservations,
  } = useQuery(GET_RESERVATIONS, {
    onCompleted: (data) => {
      setReservedNumber(data.getMyReservations.length);
    },
  });
  // const {
  //   loading: loadingAllReservations,
  //   error: errorAllReservations,
  //   data: dataAllReservations,
  //   refetch: refetchAllReservations,
  // } = useQuery(GET_ALL_RESERVATIONS);

  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
  } = useQuery(GET_CUBICLES, {
    onCompleted: () => {
      setAvailableCubicles(6);
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

  if (errorReservations)
    return Alert.alert(`Error! ${errorReservations.message}`);

  useEffect(() => {
    refetchReservations();
  }, []);

  useEffect(() => {
    if (dataReservations) {
      setMyReservations(dataReservations.getMyReservations);
    }
  }, [dataReservations]);

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
            loadingReservations={loadingReservations}
            availableCubicles={availableCubicles}
            loadingCubicles={loadingCubicles}
          />

          {/* Separation Line */}
          <SectionDivider marginBottom={20} />
          <Text style={styles.reservationsTitle}>Próximas Reservaciones</Text>
          {loadingReservations ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size='small' color='#FFF' />
            </View>
          ) : dataReservations.getMyReservations &&
            dataReservations.getMyReservations.length > 0 ? (
            dataReservations.getMyReservations.map((reservation, index) => {
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
            <Text style={styles.noReservationsText}>No reservations</Text>
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
