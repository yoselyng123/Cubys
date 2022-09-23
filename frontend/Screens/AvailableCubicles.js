import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
/* Assets */
import colors from '../assets/colors';
/* Components */
import Header from '../components/Header';
import InfoAvailability from '../components/InfoAvailability';

const AvailableCubicles = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title='Available Cubicles'
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.infoLeftWrapper}>
            <InfoAvailability label='Date' content='15 Oct 2022' />
            <InfoAvailability label='Start Time' content='03:30pm' />
          </View>
          <View style={styles.infoRightWrapper}>
            <InfoAvailability label='Floor' content='Second' />

            <InfoAvailability label='End Time' content='05:30pm' />
          </View>
        </View>
        {/* Map goes here */}
      </View>
    </View>
  );
};

export default AvailableCubicles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    marginRight: '15%',
  },
});
