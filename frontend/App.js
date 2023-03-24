import * as SplashScreen from 'expo-splash-screen';
/* Custom Font, Icon, Colors */
import { useFonts } from 'expo-font';
/* Apollo Server */
import { ApolloProvider } from '@apollo/client';
import { client } from './src/utils/apollo';
import Navigation from './src/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* Alerts */
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';
import useToastMessage from './src/hooks/useToastMessage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Gilroy-Bold': require('./src/assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-Semibold': require('./src/assets/fonts/Gilroy-Semibold.ttf'),
    'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('./src/assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
  });

  const { toastConfig } = useToastMessage();

  AsyncStorage.removeItem('token');

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Navigation />
        <FlashMessage position='top' />
        <Toast config={toastConfig} />
      </ApolloProvider>
    );
  }
}
