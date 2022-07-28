import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
/* ASSETS */
import colors from "../assets/colors";
import { Entypo } from "@expo/vector-icons";

const Header = ({ title, navigateAvailable }) => {
  return (
    <View style={styles.container}>
      {navigateAvailable && (
        <TouchableOpacity activeOpacity={0.7}>
          <Entypo
            style={styles.chevron}
            name="chevron-left"
            size={32}
            color={colors.dark}
          />
        </TouchableOpacity>
      )}

      <Text style={navigateAvailable ? styles.title : styles.cubys}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 111,
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 15,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  title: {
    marginTop: 60,
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    color: colors.dark,
    textAlign: "center",
    letterSpacing: 0.6,
  },
  chevron: {
    position: "absolute",
    left: 15,
    top: 64,
  },
  cubys: {
    marginTop: 60,
    fontFamily: "Gilroy-Semibold",
    fontSize: 32,
    textAlign: "center",
  },
});
