import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
/* Assets */
import colors from "../assets/colors";
/* Components */
import Header from "../components/Header";
import Reservation from "../components/Reservation";

const History = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title="History"
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Here you can check your past reservations
          </Text>
          <View
            style={{
              borderBottomColor: colors.light,
              borderBottomWidth: 2,
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
          <View style={styles.scrollContainer}>
            <Reservation />
            <Reservation />
            <Reservation />
            <Reservation />
            <Reservation />
            <Reservation />
            <Reservation />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
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
