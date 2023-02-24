import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { Dimensions } from 'react-native';
/* Assets */
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';
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

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 32) / 2 - 9;

  const { lockStatus, user } = useContext(userContext);

  if (user) {
    return (
      <View style={styles.cardsWrapper}>
        {/* CARD 1 */}
        {loadingCubicles ? (
          <View
            style={[
              styles.cardItemLoading,
              { marginRight: 18, backgroundColor: theme.loading },
            ]}
          />
        ) : (
          <TouchableOpacity
            style={[styles.cardItem, { width: cardWidth, marginRight: 18 }]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('AvailableCubicles');
            }}
          >
            <Card
              title='Cubículos'
              subtitle={availableCubicles}
              icon={
                <FontAwesome5 name='check' size={38} color={colors.purple} />
              }
            />
          </TouchableOpacity>
        )}

        {/* CARD 2 */}
        {loadingCubicles ? (
          <View
            style={[
              styles.cardItemLoading,
              { marginRight: 0, backgroundColor: theme.loading },
            ]}
          />
        ) : (
          <TouchableOpacity
            style={[styles.cardItem, { width: cardWidth }]}
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
          <TouchableOpacity
            style={[styles.cardItem, { width: cardWidth, marginRight: 18 }]}
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
              subtitle={lockStatus}
              icon={
                lockStatus === 'Abierto' ? (
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
          <TouchableOpacity
            style={[styles.cardItem, { width: cardWidth }]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('HistoryAdmin');
            }}
          >
            <Card
              title='Historiales'
              subtitle={historialCount}
              icon={
                <MaterialIcons name='restore' size={38} color={colors.purple} />
              }
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.cardItem, { width: cardWidth }]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('History');
            }}
          >
            <Card
              title='Historial'
              subtitle={historialCount}
              icon={
                <MaterialIcons name='restore' size={38} color={colors.purple} />
              }
            />
          </TouchableOpacity>
        )}
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
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 25,
  },
  cardItemLoading: {
    marginBottom: 15,
    height: 100,
    width: 170,
    borderRadius: 10,
  },
  cardItem: {
    marginBottom: 15,
  },
});
