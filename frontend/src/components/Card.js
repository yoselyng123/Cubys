import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
/* Assets */
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors';
import themeContext from '../context/themeContext';
import { userContext } from '../context/userContext';

const Card = ({ title, subtitle, icon, reservedNumber, availableCubicles }) => {
  const theme = useContext(themeContext);
  const { user } = useContext(userContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.white }]}>
      <View style={styles.topWrapper}>
        <Text style={[styles.title, { color: theme.dark }]}>{title}</Text>
        <Ionicons name='chevron-forward' size={24} color={theme.dark} />
      </View>
      {title !== 'Reservaciones' ? (
        <Text
          style={[
            styles.availability,
            { color: theme.dark },
            title === 'Botón de Acceso' && { fontSize: 25 },
          ]}
        >
          {subtitle}
        </Text>
      ) : (
        <Text style={[styles.reservedNumber, { color: theme.dark }]}>
          {reservedNumber}
          <Text style={[styles.reservedAvailability, { color: theme.dark }]}>
            {user.role === 'admin' ? `/${availableCubicles}` : '/1'}
          </Text>
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
