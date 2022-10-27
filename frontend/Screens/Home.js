import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
/* Assets */
import colors from '../assets/colors';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import CardsList from '../components/CardsList';
import { userContext } from '../context/userContext';
/* APOLLO SERVER */
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_RESERVATIONS = gql`
  query getMyReservations {
    getMyReservations {
      id
      cubicleID
      createdBy
      startTime
      endTime
      date
    }
  }
`;

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      sala
      cubicleNumber
      availability
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

  const [deleteReservation, { loading: loadingReservation }] = useMutation(
    DELETE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        setPressedCancel(false);
        Alert.alert('Se ha cancelado la reservación');
        refetchCubicles();
      },
      onError: () => {
        Alert.alert(
          'No se pudo cancelar la reservación. Por favor intente de nuevo'
        );
      },
      refetchQueries: [{ query: GET_RESERVATIONS, GET_CUBICLES }],
    }
  );

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
  } = useQuery(GET_RESERVATIONS, {
    onCompleted: (data) => {
      setReservedNumber(data.getMyReservations.length);
    },
  });

  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
    refetch: refetchCubicles,
  } = useQuery(GET_CUBICLES, {
    onCompleted: (data) => {
      let counter = 0;
      data.getCubicles.map((cubicle) => {
        if (cubicle.availability) {
          counter += 1;
        }
      });
      setAvailableCubicles(counter);
    },
  });

  if (errorCubicles) return Alert.alert(`Error! ${errorCubicles.message}`);

  if (errorReservations)
    return Alert.alert(`Error! ${errorReservations.message}`);

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
            reservedNumber={reservedNumber}
            loadingReservations={loadingReservations}
            availableCubicles={availableCubicles}
            loadingCubicles={loadingCubicles}
          />

          {/* Separation Line */}
          <View
            style={{
              borderBottomColor: colors.light,
              borderBottomWidth: 2,
              marginBottom: 20,
            }}
          />
          <Text style={styles.reservationsTitle}>Upcoming reservations</Text>
          {loadingReservations ? (
            <Text>Loading...</Text>
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
