import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

/* ASSETS */
import colors from "../assets/colors";

const Input = ({
    title,
    placeholder,
}) => {
  const [text, onChangeText] = React.useState(undefined);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 45,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.gray,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
    marginTop: 5,
  },
});
