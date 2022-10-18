import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Dimensions } from 'react-native';
/* Assets */
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';
/* Components */
import Card from './Card';
/* APOLLO SERVER */
import { useQuery, gql } from '@apollo/client';

const CardsList = ({
  navigation,
  reservedNumber,
  availableCubicles,
  loadingCubicles,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 32) / 2 - 9;

  return (
    <View style={styles.cardsWrapper}>
      {/* CARD 1 */}
      {loadingCubicles ? (
        <View style={[styles.cardItemLoading, { marginRight: 18 }]} />
      ) : (
        <TouchableOpacity
          style={[styles.cardItem, { width: cardWidth, marginRight: 18 }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('AvailableCubicles');
          }}
        >
          <Card
            title='Available cubicles'
            subtitle={availableCubicles}
            icon={<FontAwesome5 name='check' size={38} color={colors.purple} />}
          />
        </TouchableOpacity>
      )}

      {/* CARD 2 */}
      {loadingCubicles ? (
        <View style={[styles.cardItemLoading, { marginRight: 0 }]} />
      ) : (
        <TouchableOpacity
          style={[styles.cardItem, { width: cardWidth }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ReservedCubicles');
          }}
        >
          <Card
            title='Reserved cubicles'
            reservedNumber={reservedNumber}
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
        <View style={[styles.cardItemLoading, { marginRight: 18 }]} />
      ) : (
        <TouchableOpacity
          style={[styles.cardItem, { width: cardWidth, marginRight: 18 }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('QRCode');
          }}
        >
          <Card
            title='Your QR code'
            subtitle='Code'
            icon={
              <FontAwesome5 name='qrcode' size={38} color={colors.purple} />
            }
          />
        </TouchableOpacity>
      )}

      {/* CARD 4 */}
      {loadingCubicles ? (
        <View style={[styles.cardItemLoading, { marginRight: 0 }]} />
      ) : (
        <TouchableOpacity
          style={[styles.cardItem, { width: cardWidth }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('History');
          }}
        >
          <Card
            title='History'
            subtitle='9'
            icon={
              <MaterialIcons name='restore' size={38} color={colors.purple} />
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
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
    backgroundColor: '#cacaca',
    width: 170,
    borderRadius: 10,
  },
  cardItem: {
    marginBottom: 15,
  },
});
