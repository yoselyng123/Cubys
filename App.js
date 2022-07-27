import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
/* Custom Font, Icon, Colors */
import { useFonts } from "expo-font";

import Welcome from "./Screens/Welcome";
import SignIn from "./Screens/SignIn";

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Semibold": require("./assets/fonts/Gilroy-Semibold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
    return null;
  } else {
    return (
      <View style={styles.container}>
        <SignIn />
        {/*<Welcome />*/}
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
