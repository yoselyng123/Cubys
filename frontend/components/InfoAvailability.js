import { StyleSheet, Text, View } from 'react-native';
import colors from '../assets/colors';

const InfoAvailability = ({ label, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.infoContentWrapper}>
        <Text style={styles.infoContent}>{content}</Text>
      </View>
    </View>
  );
};

export default InfoAvailability;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0.6,
    lineHeight: 26,
    color: colors.gray,
    marginBottom: 4,
  },
  infoContentWrapper: {
    backgroundColor: '#fff',
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  infoContent: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.6,
    lineHeight: 18,
  },
});
