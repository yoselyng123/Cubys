import { useState, useEffect, useCallback } from 'react';
import { Image } from 'react-native';

/* Custom Font, Icon, Colors */
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
/* Apollo Server */
import { ApolloProvider } from '@apollo/client';
import { client } from './src/utils/apollo';
import Navigation from './src/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* Alerts */
import Toast from 'react-native-toast-message';
import useToastMessage from './src/hooks/useToastMessage';
/* Expo Utilities */
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const cacheImages = async () => {
    const images = [
      require('./src/assets/img/UnimetLogo.png'),
      require('./src/assets/img/piso1.png'),
      require('./src/assets/img/piso2.png'),
      require('./src/assets/img/mesaVerde.png'),
      require('./src/assets/img/mesaRoja.png'),
      require('./src/assets/img/mesaMorada.png'),
      require('./src/assets/img/blankProfile.png'),
    ];
    return images.map(async (image) => {
      if (typeof image === 'string') {
        return await Image.prefetch(image);
      } else {
        return await Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const cacheFonts = async () => {
    const fonts = [
      Ionicons.font,
      Feather.font,
      Entypo.font,
      { 'Gilroy-Bold': require('./src/assets/fonts/Gilroy-Bold.ttf') },
      { 'Gilroy-Semibold': require('./src/assets/fonts/Gilroy-Semibold.ttf') },
      { 'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf') },
      { 'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf') },
      { 'Roboto-Italic': require('./src/assets/fonts/Roboto-Italic.ttf') },
      { 'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf') },
      { 'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf') },
      { 'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf') },
      { 'Roboto-Thin': require('./src/assets/fonts/Roboto-Thin.ttf') },
    ];
    return fonts.map(async (font) => await Font.loadAsync(font));
  };

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        const imageAssets = await cacheImages();
        const fontAssets = await cacheFonts();
        await Promise.all([...imageAssets, ...fontAssets]);
      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  // let [fontsLoaded] = useFonts({
  //   'Gilroy-Bold': require('./src/assets/fonts/Gilroy-Bold.ttf'),
  //   'Gilroy-Semibold': require('./src/assets/fonts/Gilroy-Semibold.ttf'),
  //   'Roboto-Black': require('./src/assets/fonts/Roboto-Black.ttf'),
  //   'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  //   'Roboto-Italic': require('./src/assets/fonts/Roboto-Italic.ttf'),
  //   'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf'),
  //   'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
  //   'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  //   'Roboto-Thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
  // });

  const { toastConfig } = useToastMessage();

  AsyncStorage.removeItem('token');

  if (!appIsReady) {
    SplashScreen.hideAsync();
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Navigation />
        <Toast config={toastConfig} />
      </ApolloProvider>
    );
  }
}
