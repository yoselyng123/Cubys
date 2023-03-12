import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react';
/* ASSETS */
import colors from '../assets/colors';
import { languageContext } from '../context/languageContext';

const Welcome = ({ navigation }) => {
  const { i18n } = useContext(languageContext);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>cubys</Text>
      </SafeAreaView>
      <View style={styles.welcomeContainer}>
        <Text style={styles.subtitle}>{i18n.t('welcomeTitle')}</Text>
        <Text style={styles.description}>{i18n.t('welcomeDescription')}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <View style={styles.btnSignIn}>
            <Text style={styles.textSignIn}>{i18n.t('welcomeSignIn')}</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.btnSignInGoogle}>
            <AntDesign name='google' size={24} color='white' />
            <Text style={styles.textSignInGoogle}>
              Iniciar sesión con Google
            </Text>
          </View>
        </TouchableOpacity> */}
        <View style={styles.noAccount}>
          <Text style={styles.textNoAction}>{i18n.t('welcomeNoAccount')}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.textAction}>{i18n.t('welcomeSignUp')}</Text>
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
    marginBottom: 20,
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
