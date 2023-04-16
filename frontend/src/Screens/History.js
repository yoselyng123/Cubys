import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useContext } from 'react';
/* Assets */
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import NoReservations from '../components/NoReservations';
import ScreenDescription from '../components/ScreenDescription';
/* Apollo */
import { useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_STATUS } from '../hooks/queries';

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
        title='Historial'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <ScreenDescription description='Aquí puedes ver tus reservaciones pasadas.' />

        <View style={styles.scrollContainer}>
          {loadingReservationsTrue ? (
            <ActivityIndicator size='small' color={theme.dark} />
          ) : dataReservationsTrue.getMyReservationsByStatus.length > 0 ? (
            <FlatList
              data={dataReservationsTrue.getMyReservationsByStatus}
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

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
