import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useContext, useState, useEffect } from 'react';
/* Assets */
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* Components */
import Card from './Card';

const CardsList = ({
  navigation,
  reservedNumber,
  availableCubicles,
  loadingCubicles,
  historialCount,
}) => {
  const theme = useContext(themeContext);

  const { lockStatus, user } = useContext(userContext);
  const [toolTipVisible, setToolTipVisible] = useState({
    toolTipCubicles: false,
    toolTipReservations: false,
    toolTipAccess: false,
    toolTipHistorial: false,
  });

  const checkFirstTimeSignIn = async () => {
    try {
      const firstTimeSignIn = await AsyncStorage.getItem('firstTimeSignIn');

      if (firstTimeSignIn === null) {
        // User is signing in for the first time
        await AsyncStorage.setItem('firstTimeSignIn', 'false');
        return true;
      } else {
        // User has signed in before
        return false;
      }
    } catch (error) {
      console.error('Error checking first-time sign-in:', error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const isFirstTime = await checkFirstTimeSignIn();

      if (isFirstTime) {
        setToolTipVisible({
          toolTipCubicles: true,
          toolTipReservations: false,
          toolTipAccess: false,
          toolTipHistorial: false,
        });
      }
    })();
  }, []);

  if (user) {
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.cardsWrapperLeft}>
          {/* CARD 1 */}
          {loadingCubicles ? (
            <View
              style={[
                styles.cardItemLoading,
                { marginRight: 18, backgroundColor: theme.loading },
              ]}
            />
          ) : (
            <Tooltip
              isVisible={toolTipVisible.toolTipCubicles}
              content={
                <Text style={[styles.walkthroughText, { color: theme.white }]}>
                  Aquí puedes ver los cubículos para realizar tu reservación
                </Text>
              }
              placement='top'
              onClose={() => {
                setToolTipVisible({
                  toolTipCubicles: false,
                  toolTipReservations: true,
                  toolTipAccess: false,
                  toolTipHistorial: false,
                });
              }}
              contentStyle={[
                styles.walkthroughWrapper,
                { backgroundColor: theme.purple },
              ]}
            >
              <TouchableOpacity
                style={styles.cardItem}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('AvailableCubicles');
                }}
              >
                <Card
                  title='Cubículos'
                  subtitle={availableCubicles}
                  icon={
                    <FontAwesome5
                      name='check'
                      size={38}
                      color={colors.purple}
                    />
                  }
                />
              </TouchableOpacity>
            </Tooltip>
          )}

          {/* CARD 3 */}
          {loadingCubicles ? (
            <View
              style={[
                styles.cardItemLoading,
                { marginRight: 18, backgroundColor: theme.loading },
              ]}
            />
          ) : (
            <Tooltip
              isVisible={toolTipVisible.toolTipAccess}
              content={
                <Text style={[styles.walkthroughText, { color: theme.white }]}>
                  {user.role === 'admin'
                    ? 'Aquí podrás abrir y cerrar cada una de las puertas de los cubículos'
                    : 'Aquí podrás abrir la puerta del cubículo una vez tengas una reservación en curso'}
                </Text>
              }
              placement='top'
              onClose={() =>
                setToolTipVisible({
                  toolTipCubicles: false,
                  toolTipReservations: false,
                  toolTipAccess: false,
                  toolTipHistorial: true,
                })
              }
              contentStyle={[
                styles.walkthroughWrapper,
                { backgroundColor: theme.purple },
              ]}
            >
              <TouchableOpacity
                style={styles.cardItem}
                activeOpacity={0.7}
                onPress={() => {
                  if (user.role === 'admin') {
                    navigation.navigate('CubicleAccessAdmin');
                  } else {
                    navigation.navigate('CubicleAccess');
                  }
                }}
              >
                <Card
                  title='Botón de Acceso'
                  subtitle={lockStatus ? 'Abierto' : 'Cerrado'}
                  icon={
                    lockStatus ? (
                      <Feather
                        name='unlock'
                        size={38}
                        color={colors.purple}
                        style={{ fontWeight: 800 }}
                      />
                    ) : (
                      <Feather
                        name='lock'
                        size={38}
                        color={colors.purple}
                        style={{ fontWeight: 800 }}
                      />
                    )
                  }
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>

        <View style={styles.cardsWrapperRight}>
          {/* CARD 2 */}
          {loadingCubicles ? (
            <View
              style={[
                styles.cardItemLoading,
                { marginRight: 0, backgroundColor: theme.loading },
              ]}
            />
          ) : (
            <Tooltip
              isVisible={toolTipVisible.toolTipReservations}
              content={
                <Text style={[styles.walkthroughText, { color: theme.white }]}>
                  {user.role === 'admin'
                    ? 'Aquí podrás ver todas las reservaciones activas'
                    : 'Aquí podrás ver el detalle de tu reservación activa'}
                </Text>
              }
              placement='top'
              onClose={() =>
                setToolTipVisible({
                  toolTipCubicles: false,
                  toolTipReservations: false,
                  toolTipAccess: true,
                  toolTipHistorial: false,
                })
              }
              contentStyle={[
                styles.walkthroughWrapper,
                { backgroundColor: theme.purple },
              ]}
            >
              <TouchableOpacity
                style={styles.cardItem}
                activeOpacity={0.7}
                onPress={() => {
                  if (user.role === 'admin') {
                    navigation.navigate('ReservedCubiclesAdmin');
                  } else {
                    navigation.navigate('ReservedCubicles');
                  }
                }}
              >
                <Card
                  title='Reservaciones'
                  reservedNumber={reservedNumber}
                  availableCubicles={availableCubicles}
                  icon={
                    <FontAwesome5
                      name='calendar-check'
                      size={38}
                      color={colors.purple}
                    />
                  }
                />
              </TouchableOpacity>
            </Tooltip>
          )}

          {/* CARD 4 */}
          {loadingCubicles ? (
            <View
              style={[
                styles.cardItemLoading,
                { marginRight: 0, backgroundColor: theme.loading },
              ]}
            />
          ) : user.role === 'admin' ? (
            <Tooltip
              isVisible={toolTipVisible.toolTipHistorial}
              content={
                <Text style={[styles.walkthroughText, { color: theme.white }]}>
                  Aquí podrás ver todas las reservaciones pasadas hechas por los
                  usuarios
                </Text>
              }
              placement='top'
              onClose={() =>
                setToolTipVisible({
                  toolTipCubicles: false,
                  toolTipReservations: false,
                  toolTipAccess: false,
                  toolTipHistorial: false,
                })
              }
              contentStyle={[
                styles.walkthroughWrapper,
                { backgroundColor: theme.purple },
              ]}
            >
              <TouchableOpacity
                style={styles.cardItem}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('HistoryAdmin');
                }}
              >
                <Card
                  title='Historiales'
                  subtitle={historialCount}
                  icon={
                    <MaterialIcons
                      name='restore'
                      size={38}
                      color={colors.purple}
                    />
                  }
                />
              </TouchableOpacity>
            </Tooltip>
          ) : (
            <Tooltip
              isVisible={toolTipVisible.toolTipHistorial}
              content={
                <Text style={[styles.walkthroughText, { color: theme.white }]}>
                  {user.role === 'admin'
                    ? 'Aquí podrás ver todas las reservaciones pasadas'
                    : 'Aquí podrás ver tus reservaciones pasadas'}{' '}
                </Text>
              }
              placement='top'
              onClose={() =>
                setToolTipVisible({
                  toolTipCubicles: false,
                  toolTipReservations: false,
                  toolTipAccess: false,
                  toolTipHistorial: false,
                })
              }
              contentStyle={[
                styles.walkthroughWrapper,
                { backgroundColor: theme.purple },
              ]}
            >
              <TouchableOpacity
                style={styles.cardItem}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('History');
                }}
              >
                <Card
                  title='Historial'
                  subtitle={historialCount}
                  icon={
                    <MaterialIcons
                      name='restore'
                      size={38}
                      color={colors.purple}
                    />
                  }
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default CardsList;

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
    //gap: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardsWrapperLeft: {
    width: '48%',
    marginRight: '4%',
  },
  cardsWrapperRight: {
    width: '48%',
  },
  cardItemLoading: {
    marginBottom: 15,
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
  cardItem: {
    marginBottom: 15,
    width: '100%',
  },
  walkthroughText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  walkthroughWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    flexWrap: 'wrap',
  },
});
