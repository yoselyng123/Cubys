import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
/* Assets */
import colors from '../../assets/colors';
import { userContext } from '../../context/userContext';
import themeContext from '../../context/themeContext';
/* Components */
import Header from '../../components/Header';
import SectionDivider from '../../components/SectionDivider';
import ScreenDescription from '../../components/ScreenDescription';

const ReservedCubicles = ({ navigation, route }) => {
  const { reservation } = route.params;

  const theme = useContext(themeContext);

  const { cubiclesList, user } = useContext(userContext);

  const handleFloorShowcase = (floor) => {
    if (floor === '1') {
      return '1er Piso';
    } else if (floor === '2') {
      return '2do Piso';
    } else if (floor === '3') {
      return '3er Piso';
    } else {
      return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        style={styles.header}
        title='Reservación'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <ScreenDescription description='Aqui puedes ver los datos de la reservación.' />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            <View style={styles.infoResContainer}>
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
                        <Text style={[styles.title, { color: theme.dark }]}>
                          Cubículo #{cubicle.cubicleNumber}
                        </Text>
                        <Text style={styles.floorText}>
                          {handleFloorShowcase(cubicle.floor)}
                        </Text>
                      </View>
                    );
                  }
                })}
                <Text style={[styles.content, { color: theme.gray }]}>
                  4 sillas y mesa
                </Text>
                <Text
                  style={[
                    styles.content,
                    { marginBottom: 20, color: theme.gray },
                  ]}
                >
                  1 pizarra
                </Text>
              </View>
              <SectionDivider marginBottom={20} />
              <View style={styles.resInfoWrapper}>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Hora de Inicio
                </Text>
                <Text
                  style={[
                    styles.content,
                    { marginBottom: 30, color: theme.gray },
                  ]}
                >
                  {reservation.date}, {reservation.startTime}
                </Text>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Hora de Fin
                </Text>
                <Text
                  style={[
                    styles.content,
                    { marginBottom: 20, color: theme.gray },
                  ]}
                >
                  {reservation.date}, {reservation.endTime}
                </Text>
              </View>
              <SectionDivider marginBottom={20} />
              <View style={styles.companionsWrapper}>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Responsable
                </Text>
                <Text
                  style={[
                    styles.content,
                    { marginBottom: 30, color: theme.gray },
                  ]}
                >
                  {user.role !== 'admin'
                    ? `${user.name} - ${user.carrera}`
                    : `${reservation.companions[0].name} - ${reservation.companions[0].carrera}`}
                </Text>
                <Text style={[styles.title, { color: theme.dark }]}>
                  Acompañantes
                </Text>
                {reservation.companions.map((companion, index1) => {
                  return (
                    <Text
                      style={[
                        styles.content,
                        { marginBottom: 2, color: theme.gray },
                      ]}
                      key={index1}
                    >
                      {companion.name} - {companion.carrera}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReservedCubicles;

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
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 18.75,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
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
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginLeft: 10,
  },
});
