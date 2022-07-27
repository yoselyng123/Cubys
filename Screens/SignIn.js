import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
/* ASSETS */
import colors from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import Header from "../Components/Header";
import Input from "../Components/Input";

const SignIn = () => {

  return (
    <View style={styles.container}>

      <Header style={styles.header} title="Sign In" />

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Input style={styles.input} title="Email Address" placeholder="Enter your email" />
          <Input style={styles.input} title="Password" placeholder="Enter your password" isPassword={true} isSignInPassword={true}/>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.btnSignIn}>
              <Text style={styles.textSignIn}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text style={styles.textNoAction}>Already Got An Account?</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.textAction}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
    position: "absolute",
  },
  content: {
    paddingTop: 154,
    paddingBottom: 64,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.background,
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnSignIn: {
    borderRadius: 10,
    backgroundColor: colors.purple,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  textSignIn: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: "#fff",
    letterSpacing: 0.6,
  },
  noAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textAction: {
    marginLeft: 5,
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: colors.purple,
    letterSpacing: 0.6,
  },
  textNoAction: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: colors.gray,
    letterSpacing: 0.6,
  },
});
