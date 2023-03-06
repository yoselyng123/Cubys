import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
/* Assets */
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';

const Tag = ({ name, icon, fontSize, iconSize }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize ? iconSize : 10}
          color={colors.iconGray}
          style={{ marginRight: 3 }}
        />
      )}
      <Text style={[styles.title, { fontSize: fontSize ? fontSize : 10 }]}>
        {name}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 5,
    borderRadius: 10,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 10,
    letterSpacing: 0.6,
  },
});
