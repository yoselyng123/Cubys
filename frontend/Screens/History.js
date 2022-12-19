import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useContext } from 'react';
/* Assets */
import colors from '../assets/colors';
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import { gql, useQuery } from '@apollo/client';

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

const History = ({ navigation }) => {
  const theme = useContext(themeContext);

  const {
    loading: loadingReservationsTrue,
    error: errorReservationsTrue,
    data: dataReservationsTrue,
    refetch: refetchReservationsTrue,
  } = useQuery(GET_RESERVATIONS_BY_STATUS, {
    variables: { completed: true },
  });

  useEffect(() => {
    refetchReservationsTrue();
  }, []);

  useEffect(() => {
    if (dataReservationsTrue) {
      refetchReservationsTrue();
    }
  }, [dataReservationsTrue]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        style={styles.header}
        title='History'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Here you can check your past reservations
          </Text>
          <View
            style={{
              borderBottomColor: theme.divider,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            {loadingReservationsTrue ? (
              <ActivityIndicator size='small' color={theme.dark} />
            ) : dataReservationsTrue.getMyReservationsByStatus.length > 0 ? (
              dataReservationsTrue.getMyReservationsByStatus.map(
                (reservation, index) => {
                  return (
                    <Reservation
                      key={index}
                      info={reservation}
                      id={reservation.cubicleID}
                    />
                  );
                }
              )
            ) : (
              <Text style={styles.noReservationsText}>
                No hay reservaciones
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  contentWrapper: {
    flex: 1,
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
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginLeft: 10,
  },
});
