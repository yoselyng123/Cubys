import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useContext } from 'react';
/* ASSETS */
import colors from '../assets/colors';
import { Entypo } from '@expo/vector-icons';
import themeContext from '../context/themeContext';

const Header = ({ title, navigateAvailable, navigation }) => {
  const theme = useContext(themeContext);
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.white,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <View style={styles.content}>
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
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: colors.dark,
    letterSpacing: 0.6,
    alignSelf: 'center',
    textAlign: 'center',
  },
  chevron: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 20,
  },
  cubys: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 32,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
