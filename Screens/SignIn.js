import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
/* ASSETS */
import colors from "../assets/colors";
import Header from "../components/Header";
import Input from "../components/Input";

const SignIn = ({ navigation }) => {
  const handleSignIn = () => {
    // AQUI SE MANEJA EL INPUT DEL USUARIO
    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title="Sign In"
        navigateAvailable={true}
        navigation={navigation}
      />

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            title="Email Address"
            placeholder="Enter your email"
          />
          <Input
            style={styles.input}
            title="Password"
            placeholder="Enter your password"
            isPassword={true}
            isSignInPassword={true}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleSignIn();
            }}
          >
            <View style={styles.btnSignIn}>
              <Text style={styles.textSignIn}>Sign In</Text>
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
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 44,
    paddingBottom: 64,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
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
