import { View, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const SectionDivider = () => {
  return <View style={styles.container} />;
};

export default SectionDivider;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});
