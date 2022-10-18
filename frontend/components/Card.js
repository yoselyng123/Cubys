import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
/* Assets */
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../assets/colors';

const Card = ({ title, subtitle, icon, reservedNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name='chevron-forward' size={24} color='black' />
      </View>
      {title !== 'Reserved cubicles' ? (
        <Text style={styles.availability}>{subtitle}</Text>
      ) : (
        <Text style={styles.reservedNumber}>
          {reservedNumber}
          <Text style={styles.reservedAvailability}>/1</Text>
        </Text>
      )}

      <View style={styles.iconWrapper}>{icon ? icon : null}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 17,
    borderRadius: 10,
    position: 'relative',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.dark,
  },
  availability: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    letterSpacing: 0.6,
    lineHeight: 38,
    color: colors.dark,
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  reservedNumber: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    letterSpacing: 0.6,
    lineHeight: 38,
    color: colors.dark,
  },
  reservedAvailability: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
});
