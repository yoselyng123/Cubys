// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// React Assets
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
// Context
import UserContextProvider from '../context/userContext';
import themeContext from '../context/themeContext';
/* Screens */
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Tabs from '../components/Tabs';
import ReservedCubicles from '../Screens/ReservedCubicles';
import ReservedCubiclesAdmin from '../Screens/Admin/ReservedCubiclesAdmin';
import History from '../Screens/History';
import HistoryAdmin from '../Screens/Admin/HistoryAdmin';
import AccessCubicle from '../Screens/AccessCubicle';
import ReservationDetails from '../Screens/ReservationDetails';
import AvailableCubicles from '../Screens/AvailableCubicles';
import SplashScreen from '../Screens/SplashScreen';
import ReservationDetailsAdmin from '../Screens/Admin/ReservationDetailsAdmin';
/* Theme Related */
import { EventRegister } from 'react-native-event-listeners';
import theme from '../assets/config/theme';
import AccessCubicleAdmin from '../Screens/Admin/AccessCubicleAdmin';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const scheme = useColorScheme();
  const [appearanceTheme, setAppearanceTheme] = useState(scheme);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeTheme',
      (data) => {
        console.log(`change theme data: ${data}}`);
        setAppearanceTheme(data);
      }
    );

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <themeContext.Provider
      value={appearanceTheme === 'dark' ? theme.dark : theme.light}
    >
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
            name='ReservedCubiclesAdmin'
            component={ReservedCubiclesAdmin}
          />
          <Stack.Screen
            name='AvailableCubicles'
            component={AvailableCubicles}
          />
          <Stack.Screen name='History' component={History} />
          <Stack.Screen name='HistoryAdmin' component={HistoryAdmin} />
          <Stack.Screen name='CubicleAccess' component={AccessCubicle} />
          <Stack.Screen
            name='CubicleAccessAdmin'
            component={AccessCubicleAdmin}
          />
          <Stack.Screen
            name='ReservationDetails'
            component={ReservationDetails}
          />
          <Stack.Screen
            name='ReservationDetailsAdmin'
            component={ReservationDetailsAdmin}
          />
        </Stack.Navigator>
        {appearanceTheme === 'light' ? (
          <StatusBar style='dark' />
        ) : (
          <StatusBar style='light' />
        )}
      </UserContextProvider>
    </themeContext.Provider>
  );
}
