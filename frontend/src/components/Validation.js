import { StyleSheet, Text, View } from 'react-native';
import colors from '../assets/colors';

const Validation = ({ icon, text }) => {
  return (
    <View style={styles.validationItem}>
      {icon}
      <Text style={styles.validationText}>{text}</Text>
    </View>
  );
};

export default Validation;

const styles = StyleSheet.create({
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  validationText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 0.6,
    marginLeft: 5,
  },
});
