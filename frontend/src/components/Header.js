import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
/* ASSETS */
import colors from '../assets/colors';
import { Entypo } from '@expo/vector-icons';
import themeContext from '../context/themeContext';

const Header = ({ title, navigateAvailable, navigation }) => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.white }]}>
      {navigateAvailable && (
        <TouchableOpacity
          style={styles.chevron}
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name='chevron-left' size={32} color={theme.dark} />
        </TouchableOpacity>
      )}

      <Text
        style={
          navigateAvailable
            ? [styles.title, { color: theme.dark }]
            : [styles.cubys, { color: theme.dark }]
        }
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 111,
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  title: {
    marginTop: 65,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: colors.dark,
    letterSpacing: 0.6,
  },
  chevron: {
    position: 'absolute',
    left: 10,
    top: 65,
  },
  cubys: {
    marginTop: 60,
    fontFamily: 'Gilroy-Semibold',
    fontSize: 32,
    textAlign: 'center',
  },
});
