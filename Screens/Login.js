import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
/* ASSETS */
import colors from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";

const Login = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>cubys</Text>
      </SafeAreaView>
      <View style={styles.welcomeContainer}>
        <Text style={styles.subtitle}>Welcome</Text>
        <Text style={styles.text}>
          Enjoy your life being easier than yesterday.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.btn1}>
            <Text style={styles.btnText1}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.btn2}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.btnText2}>Sign In using Google</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.noAccount}>
          <Text style={styles.textNoAction}>No account yet?</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.textAction}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    paddingBottom: "10%",
    paddingHorizontal: "15%",
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Gilroy-Bold",
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 28,
    color: "#fff",
    marginBottom: 7,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    lineHeight: 26,
    width: "55%",
  },
  footer: {},
  btn1: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  btnText1: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  btn2: {
    borderColor: "#fff",
    borderWidth: 2,
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  btnText2: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: "#fff",
    marginLeft: 10,
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
    color: "#fff",
  },
  textNoAction: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#fff",
  },
});
