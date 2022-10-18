import { ScrollView, StyleSheet, Text, View } from 'react-native';
/* Assets */
import colors from '../assets/colors';
import CubicleMomentaneo from '../components/CubicleMomentaneo';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      id
      sala
      floor
      cubicleNumber
      maxCapacity
      minCapacity
      availability
    }
  }
`;

const AvailableCubicles = ({ navigation }) => {
  const {
    loading: loadingCubicles,
    error: errorCubicles,
    data: dataCubicles,
  } = useQuery(GET_CUBICLES);

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [floor, setFloor] = useState('Primero');

  useEffect(() => {
    let month = new Date().toString().split(' ')[1];
    let day = new Date().toString().split(' ')[2];
    let year = new Date().toString().split(' ')[3];
    let hour = new Date().toString().split(' ')[4].split(':')[0];
    let min = new Date().toString().split(' ')[4].split(':')[0];
    let timeZone = '';
    if (hour < 12) {
      timeZone = 'am';
    } else {
      timeZone = 'pm';
      if (hour > 12) {
        hour = hour - 12;
      }
    }

    setStartTime(`${hour}:${min}${timeZone}`);
    setEndTime(`${hour + 2}:${min}${timeZone}`);
    setDate(`${day} ${month} ${year}`);
  }, []);

  if (errorCubicles) return Alert.alert(`Error! ${errorCubicles.message}`);

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Available Cubicles'
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.infoLeftWrapper}>
            <InfoAvailability
              label='Fecha'
              content={date}
              setContent={setDate}
            />
            <InfoAvailability
              label='Hora de Entrada'
              content={startTime}
              setContent={setStartTime}
            />
          </View>
          <View>
            <InfoAvailability
              label='Piso'
              content={floor}
              setContent={setFloor}
            />
            <InfoAvailability
              label='Hora de Salida'
              content={endTime}
              setContent={setEndTime}
            />
          </View>
        </View>
        {/* Map goes here */}
        {loadingCubicles ? (
          <Text>Loading...</Text>
        ) : (
          dataCubicles.getCubicles.map((cubicle, index) => {
            return (
              <CubicleMomentaneo
                key={index}
                cubicle={cubicle}
                navigation={navigation}
                resInfo={{
                  date,
                  startTime,
                  endTime,
                  floor,
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default AvailableCubicles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLeftWrapper: {
    marginRight: '15%',
  },
});
