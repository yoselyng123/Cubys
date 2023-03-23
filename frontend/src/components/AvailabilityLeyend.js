import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import themeContext from '../context/themeContext';

const AvailabilityLeyend = () => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.leyendWrapper}>
      <View style={styles.leyendContainer}>
        <Text style={[styles.leyendText, { color: theme.gray }]}>
          Disponible
        </Text>
        <View style={[styles.leyendColor, { backgroundColor: theme.green }]} />
      </View>
      <View style={styles.leyendContainer}>
        <Text style={[styles.leyendText, { color: theme.gray }]}>Ocupado</Text>
        <View style={[styles.leyendColor, { backgroundColor: theme.red }]} />
      </View>
      <View style={styles.leyendContainer}>
        <Text style={[styles.leyendText, { color: theme.gray }]}>
          Seleccionado
        </Text>
        <View style={[styles.leyendColor, { backgroundColor: theme.purple }]} />
      </View>
    </View>
  );
};

export default AvailabilityLeyend;

const styles = StyleSheet.create({
  leyendWrapper: {
    alignSelf: 'flex-end',
  },
  leyendContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  leyendColor: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  leyendText: {
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
    marginRight: 6,
  },
});
