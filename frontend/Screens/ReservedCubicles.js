import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
/* Assets */
import colors from '../assets/colors';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
/* Apollo Server */
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

const DELETE_RESERVATION_MUTATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

const ReservedCubicles = ({ navigation }) => {
  const [pressedCancel, setPressedCancel] = useState(false);
  const [deleteReservation, { loading: loadingReservation }] = useMutation(
    DELETE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        setPressedCancel(false);
        Alert.alert('Se ha cancelado la reservación');
      },
      onError: () => {
        Alert.alert(
          'No se pudo cancelar la reservación. Por favor intente de nuevo'
        );
      },
      refetchQueries: [{ query: GET_RESERVATIONS }],
    }
  );

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
  } = useQuery(GET_RESERVATIONS, {
    onCompleted: (data) => {},
  });

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Reserved Cubicles'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Here you can check your current reservations
          </Text>
          <View
            style={{
              borderBottomColor: colors.light,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
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
    </View>
  );
};

export default ReservedCubicles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
});
