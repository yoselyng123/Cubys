import { StyleSheet, Text, View } from "react-native";
import React from "react";
/* Assets */
import colors from "../assets/colors";
import QRCode from "react-native-qrcode-svg";
/* Components */
import Header from "../components/Header";

const QrCode = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        style={styles.header}
        title="QR Code"
        navigateAvailable={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Text style={styles.description}>
          Use this QR code to access the cubicles you reserved
        </Text>
        <View
          style={{
            borderBottomColor: colors.light,
            borderBottomWidth: 2,
            marginBottom: 18,
          }}
        />
        <View style={styles.qrcodeWrapper}>
          <QRCode
            value="Your text goes here"
            size={270}
            color={colors.purple}
            backgroundColor="rgba(0,0,0,0)"
          />
        </View>
      </View>
    </View>
  );
};

export default QrCode;

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
  qrcodeWrapper: {
    marginTop: 150,
    alignSelf: "center",
  },
});
