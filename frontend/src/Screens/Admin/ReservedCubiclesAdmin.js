import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
/* Assets */
import colors from '../../assets/colors';
import themeContext from '../../context/themeContext';
import dayjs from 'dayjs';
/* Components */
import Header from '../../components/Header';
import SectionDivider from '../../components/SectionDivider';
import { useQuery, useMutation } from '@apollo/client';
import Reservation from '../../components/Reservation';
import { GET_ALL_RESERVATIONS_BY_STATUS } from '../../hooks/queries';
import { UPDATE_RESERVATION_STATUS } from '../../hooks/mutations';
import NoReservations from '../../components/NoReservations';

// TODO: TERMINAR CHECKIFCOMPLETED Y TRAER TODAS LAS RESERVACIONES
// CON STATUS ACTIVO

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

  const renderReservation = ({ reservation }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      key={index}
      onPress={() =>
        navigation.navigate('ReservationDetailsAdmin', {
          reservation,
        })
      }
    >
      <Reservation key={index} info={reservation} id={reservation.cubicleID} />
    </TouchableOpacity>
  );

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

        <View style={styles.scrollContainer}>
          {loadingReservations ? (
            <ActivityIndicator size='small' color={theme.dark} />
          ) : dataReservations.getReservationsByStatus.length > 0 ? (
            <FlatList
              data={dataReservations.getReservationsByStatus}
              renderItem={({ item }) => (
                <Reservation info={item} id={item.cubicleID} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <NoReservations />
          )}
        </View>
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
