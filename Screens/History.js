import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
/* Assets */
import colors from "../assets/colors";
/* Components */
import Header from "../components/Header";
import Reservation from "../components/Reservation";

const History = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        style={styles.header}
        title="History"
        navigateAvailable={true}
        navigation={navigation}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Here you can check your past reservations
        </Text>
        <View
          style={{
            borderBottomColor: colors.light,
            borderBottomWidth: 2,
            marginBottom: 18,
          }}
        />
        <Reservation />
        <Reservation />
        <Reservation />
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  description: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: colors.gray,
    marginBottom: 20,
  },
});
