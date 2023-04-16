import { StyleSheet, Text, View } from 'react-native';
import SectionDivider from './SectionDivider';
import { useContext } from 'react';
import themeContext from '../context/themeContext';

const ScreenDescription = ({ description }) => {
  const theme = useContext(themeContext);
  return (
    <View style={styles.descriptionContainer}>
      <Text style={[styles.description, { color: theme.gray }]}>
        {description}
      </Text>
      <SectionDivider />
    </View>
  );
};

export default ScreenDescription;

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    marginBottom: 20,
  },
});
