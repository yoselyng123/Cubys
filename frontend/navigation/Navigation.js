// Navigation
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// React Assets
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
// Context
import UserContextProvider from '../context/userContext';
import ThemeContextProvider from '../context/themeContext';
/* Screens */
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Tabs from '../components/Tabs';
import ReservedCubicles from '../Screens/ReservedCubicles';
import History from '../Screens/History';
import AccessCubicle from '../Screens/AccessCubicle';
import ReservationDetails from '../Screens/ReservationDetails';
import AvailableCubicles from '../Screens/AvailableCubicles';
import SplashScreen from '../Screens/SplashScreen';

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Stack.Navigator
          initialRouteName='SplashScreen'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='Tabs' component={Tabs} />
          <Stack.Screen name='ReservedCubicles' component={ReservedCubicles} />
          <Stack.Screen
            name='AvailableCubicles'
            component={AvailableCubicles}
          />
          <Stack.Screen name='History' component={History} />
          <Stack.Screen name='CubicleAccess' component={AccessCubicle} />
          <Stack.Screen
            name='ReservationDetails'
            component={ReservationDetails}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}
