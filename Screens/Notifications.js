import { StyleSheet, Text, View } from "react-native";
import React from "react";
/* Assets */
import colors from "../assets/colors";
/* Components */
import Header from "../components/Header";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header title="cubys" navigateAvailable={false} />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
