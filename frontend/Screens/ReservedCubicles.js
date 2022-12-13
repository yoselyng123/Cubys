import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
/* Assets */
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
/* Components */
import Header from '../components/Header';
import SectionDivider from '../components/SectionDivider';

const ReservedCubicles = ({ navigation }) => {
  const [cubicleInfo, setCubicleInfo] = useState({});

  const { myReservations, cubiclesList } = useContext(userContext);

  const handleFloorShowcase = (floor) => {
    if (floor === '1') {
      return '1er Piso';
    } else if (floor === '2') {
      return '2do Piso';
    } else if (floor === '3') {
      return '3er Piso';
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Reservaciones'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Aqui puedes ver tu reservación actual
          </Text>
          <SectionDivider />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            {myReservations.length > 0 ? (
              myReservations.map((reservation, index) => {
                return (
                  <View key={index} style={styles.infoResContainer}>
                    <View style={styles.cubicleInfoWrapper}>
                      {cubiclesList.map((cubicle, indexC) => {
                        if (cubicle.id === reservation.cubicleID) {
                          return (
                            <View
                              key={indexC}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.title}>
                                Cubículo #{cubicle.cubicleNumber}
                              </Text>
                              <Text style={styles.floorText}>
                                {handleFloorShowcase(cubicle.floor)}
                              </Text>
                            </View>
                          );
                        }
                      })}
                      <Text style={styles.content}>4 sillas y mesa</Text>
                      <Text style={[styles.content, { marginBottom: 20 }]}>
                        1 pizarra
                      </Text>
                    </View>
                    <SectionDivider marginBottom={20} />
                    <View style={styles.resInfoWrapper}>
                      <Text style={styles.title}>Hora de Inicio</Text>
                      <Text style={[styles.content, { marginBottom: 30 }]}>
                        {reservation.date}, {reservation.startTime}
                      </Text>
                      <Text style={styles.title}>Hora de Fin</Text>
                      <Text style={[styles.content, { marginBottom: 20 }]}>
                        {reservation.date}, {reservation.endTime}
                      </Text>
                    </View>
                    <SectionDivider marginBottom={20} />
                    <View style={styles.companionsWrapper}>
                      <Text style={styles.title}>Responsable</Text>
                      <Text style={[styles.content, { marginBottom: 30 }]}>
                        Javier Jerez - Ingenieria en Sistemas
                      </Text>
                      <Text style={styles.title}>Acompañantes</Text>
                      {reservation.companions.map((companion, index1) => {
                        return (
                          <Text
                            style={[styles.content, { marginBottom: 2 }]}
                            key={index1}
                          >
                            {companion.name} - {companion.carrera}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
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
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 18.75,
    letterSpacing: 0.6,
    color: colors.dark,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  reserveBtn: {
    backgroundColor: colors.purple,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  reserveBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 17.58,
    color: '#fff',
    marginBottom: 4,
  },
  companionsWrapper: {
    marginBottom: '15%',
  },
  floorText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 18.75,
    letterSpacing: 0.6,
    color: colors.gray,
  },
});
