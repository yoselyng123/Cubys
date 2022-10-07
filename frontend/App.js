import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
/* Custom Font, Icon, Colors */
import { useFonts } from 'expo-font';
/* Apollo Server */
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import Navigation from './navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

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

  AsyncStorage.removeItem('token');

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Navigation />
        <StatusBar style='auto' />
      </ApolloProvider>
    );
  }
}
