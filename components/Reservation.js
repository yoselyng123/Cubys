import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
/* Assets */
import Tag from "./Tag";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";

const Reservation = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: colors.purple,
          borderLeftWidth: 4,
          paddingLeft: 8,
        }}
      >
        <View style={styles.infoWrapper}>
          <View style={styles.LeftInfoWrapper}>
            <Text style={styles.idCubicle}>Cubicle #5</Text>
            <Text style={styles.cubicleFloor}>2nd Floor</Text>
          </View>
          <TouchableOpacity style={styles.rightInfoWrapper} activeOpacity={0.7}>
            <Text style={styles.cancelRes}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagsWrapper}>
          <Tag name="x4" icon="person" />
          <Tag name="Board" />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View>
          <Text style={styles.timeTitle}>Start Time</Text>
          <Text style={styles.time}>29 Nov 2022,{"\n"}03:30pm</Text>
        </View>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={24}
          color={colors.gray}
        />
        <View>
          <Text style={styles.timeTitle}>End Time</Text>
          <Text style={styles.time}>29 Nov 2022,{"\n"}05:30pm</Text>
        </View>
      </View>
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  LeftInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1.05,
  },
  rightInfoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tagsWrapper: {
    flexDirection: "row",
  },
  idCubicle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.dark,
  },
  cubicleFloor: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    letterSpacing: 0.6,
    color: colors.gray,
  },
  cancelRes: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    letterSpacing: 0.6,
    color: colors.purple,
  },
  bottomSection: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    lineHeight: 26,
    color: colors.gray,
    letterSpacing: 0.6,
  },
  time: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    lineHeight: 26,
    color: colors.dark,
    letterSpacing: 0.6,
  },
});
