import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../assets/colors';
import themeContext from '../context/themeContext';

const SectionDivider = ({ marginBottom, marginTop }) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: marginBottom,
          borderBottomColor: theme.divider,
          marginTop: marginTop,
        },
      ]}
    />
  );
};

export default SectionDivider;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});
