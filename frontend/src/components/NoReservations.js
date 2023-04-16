import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';

import themeContext from '../context/themeContext';

const NoReservations = () => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Text style={[styles.noReservationsText, { color: theme.gray }]}>
        No hay reservaciones
      </Text>
    </View>
  );
};

export default NoReservations;

const styles = StyleSheet.create({
  noReservationsText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    marginLeft: 10,
  },
});
