import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
/* Assets */
import colors from "../assets/colors";
/* Components */
import Header from "../components/Header";
import Input from "../components/Input";
import DateInput from "../components/DateInput";

const Profile = () => {

  return (
    <View style={styles.container}>
      <Header title="cubys" navigateAvailable={false} />

      <View style={styles.content}>
        <Image
          source={{
            uri: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Javier Jerez</Text>
        <Text style={styles.profileJob}>Full Stack Developer</Text>
        <ScrollView style={styles.inputContainer} showsVerticalScrollIndicator={false}>
          <Input
            style={styles.input}
            title="Email Address"
            defaultValue="javierjerezantonetti@gmail.com"
            placeholder="Enter your email"
            isPassword={false}
            isSignInPassword={false}
          />
          <Input
            style={styles.input}
            title="Username"
            defaultValue="JotaJota"
            placeholder="Enter your username"
          />
          <Input
            style={styles.input}
            title="Password"
            placeholder="Enter your password"
            defaultValue="password"
            isPassword={true}
          />
          <DateInput
            style={styles.input}
            title="Birth Date (Optional)"
            placeholder="Enter your birth date"
          />
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.joinedtext}>
            Joined <Text style={styles.joineddate}>22 Jan 2022</Text>
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.logout}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 64,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 30,
    width: "100%",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    color: colors.dark,
    marginTop: 10,
    letterSpacing: 0.6,
  },
  profileJob: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: colors.gray,
    marginTop: 5,
    letterSpacing: 0.6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 10,
  },
  logout: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: colors.red,
    letterSpacing: 0.6,
  },
  joinedtext: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: colors.gray,
    letterSpacing: 0.6,
  },
  joineddate: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: colors.dark,
    letterSpacing: 0.6,
  },
});
