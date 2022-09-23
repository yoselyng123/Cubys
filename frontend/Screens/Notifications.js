import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
/* Assets */
import colors from '../assets/colors';
/* Components */
import Header from '../components/Header';
import Notification from '../components/Notification';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header title='cubys' navigateAvailable={false} />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <View style={styles.texts}>
            <Text style={styles.description}>Notifications</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.markread}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: colors.light,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
        >
          <View style={styles.scrollContainer}>
            <Notification />
            <Notification />
            <Notification read={true} />
            <Notification read={true} />
            <Notification read={true} />
            <Notification read={true} />
            <Notification read={true} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    letterSpacing: 0.6,
    color: colors.dark,
    marginBottom: 20,
  },
  markread: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    letterSpacing: 0.6,
    color: colors.purple,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
