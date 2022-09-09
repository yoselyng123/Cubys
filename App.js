import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
/* Custom Font, Icon, Colors */
import { useFonts } from 'expo-font';
/* Navigation */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* Screens */
import Welcome from './Screens/Welcome';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Tabs from './components/Tabs';
import ReservedCubicles from './Screens/ReservedCubicles';
import History from './Screens/History';
import QrCode from './Screens/QrCode';
import ReservationDetails from './Screens/ReservationDetails';
import AvailableCubicles from './Screens/AvailableCubicles';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
        'Gilroy-Semibold': require('./assets/fonts/Gilroy-Semibold.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    });

    if (!fontsLoaded) {
        SplashScreen.hideAsync();
        return null;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Welcome'
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name='Welcome' component={Welcome} />
                    <Stack.Screen name='SignIn' component={SignIn} />
                    <Stack.Screen name='SignUp' component={SignUp} />
                    <Stack.Screen name='Tabs' component={Tabs} />
                    <Stack.Screen
                        name='ReservedCubicles'
                        component={ReservedCubicles}
                    />
                    <Stack.Screen
                        name='AvailableCubicles'
                        component={AvailableCubicles}
                    />
                    <Stack.Screen name='History' component={History} />
                    <Stack.Screen name='QRCode' component={QrCode} />
                    <Stack.Screen
                        name='ReservationDetails'
                        component={ReservationDetails}
                    />
                </Stack.Navigator>
                <StatusBar style='auto' />
            </NavigationContainer>
        );
    }
}
