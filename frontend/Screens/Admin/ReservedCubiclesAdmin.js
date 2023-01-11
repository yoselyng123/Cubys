import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
/* Assets */
import colors from '../../assets/colors';
import { userContext } from '../../context/userContext';
import themeContext from '../../context/themeContext';
import dayjs from 'dayjs';
/* Components */
import Header from '../../components/Header';
import SectionDivider from '../../components/SectionDivider';
import { gql, useQuery, useMutation } from '@apollo/client';
import Reservation from '../../components/Reservation';

// TODO: TERMINAR CHECKIFCOMPLETED Y TRAER TODAS LAS RESERVACIONES
// CON STATUS ACTIVO

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

const ReservedCubicles = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
    refetch: refetchReservations,
  } = useQuery(GET_ALL_RESERVATIONS_BY_STATUS, {
    variables: { completed: false },
  });

  const [updateReservationStatus] = useMutation(UPDATE_RESERVATION_STATUS);

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
    if (!loadingReservations) {
      if (dataReservations.getReservationsByStatus.length > 0) {
        for (
          let r = 0;
          r < dataReservations.getReservationsByStatus.length;
          r++
        ) {
          const reservation = dataReservations.getReservationsByStatus[r];
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
    if (dataReservations) {
      checkIfCompleted();
    }
  }, [dataReservations]);

  useEffect(() => {
    if (updateReservationStatus) {
      refetchReservations();
    }
  }, [updateReservationStatus]);

  useEffect(() => {
    refetchReservations();
    setInterval(() => {
      setCurrentDate(dayjs());
    }, 1000 * 60);
    return () => {
      clearInterval(currentDate);
      setCurrentDate('');
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        style={styles.header}
        title='Reservaciones Activas'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Aquí puedes ver las reservaciones activas del día.
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
                        key={index}
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
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginLeft: 10,
  },
});
