import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userContext } from '../context/userContext';
import themeContext from '../context/themeContext';

const SplashScreen = () => {
  const theme = useContext(themeContext);

  const navigation = useNavigation();
  const { setToken } = useContext(userContext);

  useEffect(() => {
    const checkUser = async () => {
      if (await isAuthenticated()) {
        navigation.navigate('Tabs');
      } else {
        navigation.navigate('Welcome');
      }
    };

    checkUser();
  }, []);

  const isAuthenticated = async () => {
    // Get token from phone storage
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    return !!token;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
