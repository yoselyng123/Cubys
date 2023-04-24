import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useContext } from 'react';
/* Assets */
import themeContext from '../../context/themeContext';
/* Components */
import Header from '../../components/Header';
import Reservation from '../../components/Reservation';
import ScreenDescription from '../../components/ScreenDescription';
import NoReservations from '../../components/NoReservations';
import { useQuery } from '@apollo/client';
import { GET_ALL_RESERVATIONS_BY_STATUS } from '../../hooks/queries';

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
      <ScreenDescription
        description='Aquí podrás ver las todas las reservaciones pasadas realizadas por
            los usuarios.'
      />

      <View style={styles.contentWrapper}>
        {loadingReservations ? (
          <ActivityIndicator size='small' color={theme.dark} />
        ) : dataReservations.getReservationsByStatus.length > 0 ? (
          <FlatList
            data={dataReservations.getReservationsByStatus}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('ReservationDetailsAdmin', {
                    reservation: item,
                  })
                }
              >
                <Reservation info={item} id={item.cubicleID} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={styles.reservationWrapper}
          />
        ) : (
          <NoReservations />
        )}
      </View>
    </View>
  );
};

export default HistoryAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  reservationWrapper: {
    padding: 16,
  },
});
