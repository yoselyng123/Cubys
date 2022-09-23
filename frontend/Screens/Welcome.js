import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
/* ASSETS */
import colors from '../assets/colors';
import { AntDesign } from '@expo/vector-icons';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>cubys</Text>
      </SafeAreaView>
      <View style={styles.welcomeContainer}>
        <Text style={styles.subtitle}>Welcome</Text>
        <Text style={styles.description}>
          Enjoy your life being{'\n'}easier than yesterday.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <View style={styles.btnSignIn}>
            <Text style={styles.textSignIn}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.btnSignInGoogle}>
            <AntDesign name='google' size={24} color='white' />
            <Text style={styles.textSignInGoogle}>Sign In using Google</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.noAccount}>
          <Text style={styles.textNoAction}>No account yet?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.textAction}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='light' />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Gilroy-Semibold',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    color: '#fff',
    marginBottom: 7,
    letterSpacing: 0.6,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.6,
  },
  btnSignIn: {
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textSignIn: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: colors.dark,
    letterSpacing: 0.6,
  },
  btnSignInGoogle: {
    borderColor: '#fff',
    borderWidth: 2,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  textSignInGoogle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
    letterSpacing: 0.6,
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAction: {
    marginLeft: 5,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
  textNoAction: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.6,
  },
});