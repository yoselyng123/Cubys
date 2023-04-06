import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useContext, useState } from 'react';
/* Assets */
import themeContext from '../context/themeContext';
/* Components */
import Header from '../components/Header';
import Reservation from '../components/Reservation';
import { useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_STATUS } from '../hooks/queries';

const History = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [lazyData, setLazyData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

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

  useEffect(() => {
    // Simulamos una llamada a una API para obtener más datos de la lista
    const fetchMoreData = () => {
      setPageNumber(pageNumber + 1);
      setLazyData([...lazyData, ...dataReservationsTrue]);
    };
    fetchMoreData();
  }, [pageNumber]);

  const renderReservation = ({ reservation }) => (
    <Reservation key={index} info={reservation} id={reservation.cubicleID} />
  );

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
            Aquí puedes ver tus reservaciones pasadas.
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
          contentContainerStyle={styles.content}
        >
          <View style={styles.scrollContainer}>
            {loadingReservationsTrue ? (
              <ActivityIndicator size='small' color={theme.dark} />
            ) : dataReservationsTrue.getMyReservationsByStatus.length > 0 ? (
              <FlatList
                data={dataReservationsTrue}
                renderItem={renderReservation}
                keyExtractor={(item) => item.id}
                onEndReached={() => setPageNumber(pageNumber + 1)}
                onEndReachedThreshold={0.5}
              />
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
    marginBottom: 20,
  },
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    marginLeft: 10,
  },
});
