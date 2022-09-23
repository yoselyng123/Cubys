import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

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
    return !!token;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
