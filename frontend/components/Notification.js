import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
/* Assets */
import Tag from './Tag';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';

const Notification = ({ read = false }) => {
  const tagColor = read ? colors.gray : colors.purple;

  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: tagColor,
          borderLeftWidth: 3,
          paddingLeft: 8,
        }}
      >
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>Reminder</Text>
          <Text style={styles.timeAgo}>5 min ago</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={1} style={styles.description}>
            Remember your reservation for cubicle #5 for tomorrow
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.dark,
  },
  timeAgo: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  description: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
    marginTop: 5,
  },
});
