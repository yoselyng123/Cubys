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
  isPassword = false,
  isSignInPassword = false,
}) => {
  const [text, onChangeText] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isSignInPassword && (
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.passForgot}>Forgot Your Password?</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        secureTextEntry={passwordVisible}
      />

      {isPassword && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            style={styles.eyeicon}
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color={colors.gray}
          />
        </TouchableOpacity>
      )}
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
  passForgot: {
    fontFamily: "Roboto-Regular",
    letterSpacing: 0.6,
    fontSize: 13,
    color: colors.purple,
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
  eyeicon: {
    position: "absolute",
    right: 10,
    bottom: 5,
    zIndex: 1,
  },
});