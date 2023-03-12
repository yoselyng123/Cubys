import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
/* Assets */
import colors from '../../assets/colors';
import themeContext from '../../context/themeContext';
/* Components */
import Header from '../../components/Header';
import SectionDivider from '../../components/SectionDivider';
import Reservation from '../../components/Reservation';
import { gql, useQuery } from '@apollo/client';

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

const HistoryAdmin = ({ navigation }) => {
  const theme = useContext(themeContext);

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
  } = useQuery(GET_ALL_RESERVATIONS_BY_STATUS, {
    variables: { completed: true },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        style={styles.header}
        title='Historial'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Aquí podrás ver las todas las reservaciones pasadas realizadas por
            los usuarios.
          </Text>
          <SectionDivider />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            {loadingReservations ? (
              <ActivityIndicator size='small' color={theme.dark} />
            ) : dataReservations.getReservationsByStatus.length > 0 ? (
              dataReservations.getReservationsByStatus.map(
                (reservation, index) => {
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
                      />
                    </TouchableOpacity>
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

export default HistoryAdmin;

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
