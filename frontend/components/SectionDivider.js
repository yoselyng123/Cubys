import { View, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const SectionDivider = ({ marginBottom }) => {
  return <View style={[styles.container, { marginBottom: marginBottom }]} />;
};

export default SectionDivider;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});
